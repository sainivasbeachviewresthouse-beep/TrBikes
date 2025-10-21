"use client";

import { useEffect, useState, ChangeEvent, FormEvent, useCallback } from "react";
import { Container, Button, Spinner, Modal, Form, Alert } from "react-bootstrap";
import { supabaseClient } from "@/lib/supabaseClient";
import BikeCard from "../components/BikeCard";
import ImageUploader from "../components/ImageUploader";
import { useBikeStore } from "@/store/useBikeStore";

// Define the shape of the form data
interface BikeFormData {
  name: string;
  registration_no: string;
  category: string;
  color: string;
  rent_per_hour: string; // Stored as string in form state for easy input handling
  image_url: string;
}

interface Bike {
  id: string;
  name: string;
  registration_no: string;
  category: string;
  color: string;
  rent_per_hour: number;
  image_url?: string;
  availability?: boolean;
}

// Function to reset the form state to its initial empty values
const initialFormData: BikeFormData = {
  name: "",
  registration_no: "",
  category: "",
  color: "",
  rent_per_hour: "",
  image_url: "",
};

export default function AdminBikesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<BikeFormData>(initialFormData);

  const { bikes, setBikes, addBike, updateBike, removeBike } = useBikeStore();
  // Safe way to get localStorage value
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  /** 🔹 Helper to reset modal state */
  const resetModal = () => {
    setShowModal(false);
    setEditingBike(null);
    setPendingFile(null);
    setFormData(initialFormData);
  };

  /** 🔹 Fetch all bikes initially */
  // 🌟 FIX: Wrapped in useCallback to make the function stable
  const fetchBikes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bikes");
      const data = await res.json();
      if (data.success) setBikes(data.data);
      else setError(data.message);
    } catch {
      setError("Failed to fetch bikes");
    } finally {
      setLoading(false);
    }
  }, [setBikes, setError]); // Dependencies required by ESLint

  /** 🔹 Subscribe to Supabase realtime updates */
  useEffect(() => {
    fetchBikes();

    const channel = supabaseClient
      .channel("bikes-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bikes" },
        (payload) => {
          if (payload.eventType === "INSERT") addBike(payload.new as Bike);
          else if (payload.eventType === "UPDATE") updateBike(payload.new as Bike);
          else if (payload.eventType === "DELETE") removeBike(payload.old.id as string);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
    // 🌟 FIX: Added all missing dependencies
  }, [fetchBikes, addBike, updateBike, removeBike]);

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /** 🔹 Handle image from ImageUploader */
  const handleImageChange = (data: File | string | null) => {
    if (data instanceof File) {
      setPendingFile(data);
      setFormData((p) => ({ ...p, image_url: "" }));
    } else if (typeof data === "string") {
      setPendingFile(null);
      setFormData((p) => ({ ...p, image_url: data }));
    } else {
      setPendingFile(null);
      setFormData((p) => ({ ...p, image_url: "" }));
    }
  };

  /** 🔹 Add / Update Bike */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    const apiFormData = new FormData();
    apiFormData.append("name", formData.name);
    apiFormData.append("registration_no", formData.registration_no);
    apiFormData.append("category", formData.category);
    apiFormData.append("color", formData.color);
    apiFormData.append("rent_per_hour", formData.rent_per_hour);

    if (pendingFile) apiFormData.append("image_file", pendingFile);
    else if (formData.image_url) apiFormData.append("image_url", formData.image_url);

    const url = editingBike ? `/api/admin/bikes/${editingBike.id}` : "/api/admin/bikes";
    const method = editingBike ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: apiFormData,
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      } else {
        resetModal(); // Reset on successful submission
      }
    } catch {
      setError("Failed to save bike");
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Delete bike */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bike?")) return;
    try {
      const res = await fetch(`/api/admin/bikes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success) setError(data.message);
    } catch {
      setError("Failed to delete bike");
    }
  };

  /** 🔹 Edit bike */
  const handleEdit = (bike: Bike) => {
    setEditingBike(bike);
    setFormData({
      name: bike.name,
      registration_no: bike.registration_no,
      category: bike.category,
      color: bike.color,
      rent_per_hour: bike.rent_per_hour.toString(),
      image_url: bike.image_url || "",
    });
    setShowModal(true);
  };

  /** 🔹 Toggle availability */
  const handleToggleActive = async (id: string, newStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/bikes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ availability: newStatus }),
      });
      const data = await res.json();
      if (!data.success) setError(data.message);
    } catch {
      setError("Failed to update status");
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Bikes</h2>
        {/* Pass initial state to Add New Bike button */}
        <Button onClick={() => {
          setEditingBike(null); 
          setFormData(initialFormData); 
          setShowModal(true);
        }}>Add New Bike</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading && bikes.length === 0 ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : bikes.length > 0 ? (
        <div className="row g-4">
          {bikes.map((bike) => (
            <div key={bike.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <BikeCard
                bike={bike}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center mt-4">No bikes found.</p>
      )}

      {/* Add/Edit Modal */}
      <Modal
        show={showModal}
        onHide={resetModal} // Use the new reset helper
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{editingBike ? "Edit Bike" : "Add New Bike"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2"><Form.Label>Name</Form.Label><Form.Control name="name" value={formData.name} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Registration No</Form.Label><Form.Control name="registration_no" value={formData.registration_no} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Category</Form.Label><Form.Control name="category" value={formData.category} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Color</Form.Label><Form.Control name="color" value={formData.color} onChange={handleChange} /></Form.Group>
            {/* Note: rent_per_hour is type="number" in the control but handled by handleChange */}
            <Form.Group className="mb-2"><Form.Label>Rent per Hour</Form.Label><Form.Control type="number" name="rent_per_hour" value={formData.rent_per_hour} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bike Image</Form.Label>
              <ImageUploader value={formData.image_url} onChange={handleImageChange} />
            </Form.Group>
            <Button type="submit" className="mt-3 w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : editingBike ? "Update Bike" : "Add Bike"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}