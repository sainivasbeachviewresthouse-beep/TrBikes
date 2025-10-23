"use client";

import { useEffect, useState, ChangeEvent, FormEvent, useCallback } from "react";
import { Container, Button, Spinner, Modal, Form, Alert } from "react-bootstrap";
import { supabaseClient } from "@/lib/supabaseClient";
import { useBikeStore } from "@/store/useBikeStore";
import { Bike } from "@/types/bike";
import BikeCard from "../components/BikeCard";
import ImageUploader from "../components/ImageUploader";

interface VehicleInputData {
  title: string;
  registration_no: string;
  category: string;
  paint_color: string;
  rental_cost_per_hour: string;
  image_url: string;
  [key: string]: string;
}

const startingInputData: VehicleInputData = {
  title: "",
  registration_no: "",
  category: "",
  paint_color: "",
  rental_cost_per_hour: "",
  image_url: "",
};

export default function AdminBikesPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [issueMessage, setIssueMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVehicleToModify, setCurrentVehicleToModify] = useState<Bike | null>(null);
  const [uploadCandidateFile, setUploadCandidateFile] = useState<File | null>(null);
  const [inputData, setInputData] = useState<VehicleInputData>(startingInputData);
  const [imageError, setImageError] = useState(false); // 🆕 for visual cue if image missing

  const { bikes, setBikes, addBike, updateBike, removeBike } = useBikeStore();
  const authKey = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  /** 🔹 Reset overlay + input state */
  const clearOverlay = () => {
    setIsModalVisible(false);
    setCurrentVehicleToModify(null);
    setUploadCandidateFile(null);
    setInputData(startingInputData);
    setImageError(false);
  };

  /** 🔹 Retrieve all bikes */
  const retrieveVehicles = useCallback(async () => {
    setIsProcessing(true);
    setIssueMessage("");
    try {
      const outcome = await fetch("/api/bikes");
      const resultData = await outcome.json();
      if (resultData.success) setBikes(resultData.data);
      else setIssueMessage(resultData.message);
    } catch {
      setIssueMessage("Failed to retrieve vehicles");
    } finally {
      setIsProcessing(false);
    }
  }, [setBikes]);

  /** 🔹 Real-time Supabase sync */
  useEffect(() => {
    const loadAllVehicles = async () => {
      try {
        await retrieveVehicles();
      } catch (err) {
        console.error(err);
      }
    };

    loadAllVehicles();

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
  }, [retrieveVehicles, addBike, updateBike, removeBike]);

  /** 🔹 Input handler */
  const handleInputAlteration = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  /** 🔹 Image from uploader */
  const handleImageAlteration = (data: File | string | null) => {
    setImageError(false); // Clear visual cue if user picks something
    if (data instanceof File) {
      setUploadCandidateFile(data);
      setInputData((p) => ({ ...p, image_url: "" }));
    } else if (typeof data === "string") {
      setUploadCandidateFile(null);
      setInputData((p) => ({ ...p, image_url: data }));
    } else {
      setUploadCandidateFile(null);
      setInputData((p) => ({ ...p, image_url: "" }));
    }
  };

  /** 🔹 Submit (Add or Update) */
  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setIssueMessage("");

    // ✅ Require image when creating a new vehicle
    if (!currentVehicleToModify && !uploadCandidateFile && !inputData.image_url) {
      setIssueMessage("Please select or upload an image for this vehicle.");
      setImageError(true);
      setIsProcessing(false);
      return;
    }

    const apiTransmissionData = new FormData();
    Object.entries(inputData).forEach(([key, val]) => {
      let finalKey = key;
      if (key === "title") finalKey = "name";
      else if (key === "paint_color") finalKey = "color";
      else if (key === "rental_cost_per_hour") finalKey = "rent_per_hour";

      if (finalKey !== "image_url" || val) apiTransmissionData.append(finalKey, val);
    });

    if (uploadCandidateFile) apiTransmissionData.append("image_file", uploadCandidateFile);

    const targetUrl = currentVehicleToModify
      ? `/api/admin/bikes/${currentVehicleToModify.id}`
      : "/api/admin/bikes";
    const requestMethod = currentVehicleToModify ? "PATCH" : "POST";

    try {
      const outcome = await fetch(targetUrl, {
        method: requestMethod,
        headers: { Authorization: `Bearer ${authKey}` },
        body: apiTransmissionData,
      });
      const resultData = await outcome.json();
      if (!resultData.success) setIssueMessage(resultData.message);
      else clearOverlay();
    } catch {
      setIssueMessage("Failed to store vehicle data");
    } finally {
      setIsProcessing(false);
    }
  };

  /** 🔹 Remove vehicle */
  const handleRemoval = async (id: string) => {
    if (!confirm("Are you sure you want to remove this vehicle?")) return;
    try {
      const outcome = await fetch(`/api/admin/bikes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authKey}` },
      });
      const resultData = await outcome.json();
      if (!resultData.success) setIssueMessage(resultData.message);
    } catch {
      setIssueMessage("Failed to remove vehicle");
    }
  };

  /** 🔹 Edit vehicle */
  const handleModification = (bike: Bike) => {
    setCurrentVehicleToModify(bike);
    setInputData({
      title: bike.name,
      registration_no: bike.registration_no,
      category: bike.category,
      paint_color: bike.color,
      rental_cost_per_hour: bike.rent_per_hour.toString(),
      image_url: bike.image_url || "",
    });
    setIsModalVisible(true);
    setImageError(false);
  };

  /** 🔹 Toggle availability */
  const handleToggleOperationalStatus = async (id: string, newStatus: boolean) => {
    try {
      const outcome = await fetch(`/api/admin/bikes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authKey}`,
        },
        body: JSON.stringify({ availability: newStatus }),
      });
      const resultData = await outcome.json();
      if (!resultData.success) setIssueMessage(resultData.message);
    } catch {
      setIssueMessage("Failed to update operational status");
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Control Vehicles</h2>
        <Button
          onClick={() => {
            setCurrentVehicleToModify(null);
            setInputData(startingInputData);
            setIsModalVisible(true);
            setImageError(false);
          }}
        >
          Insert New Vehicle
        </Button>
      </div>

      {issueMessage && <Alert variant="danger">{issueMessage}</Alert>}

      {isProcessing && bikes.length === 0 ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : bikes.length > 0 ? (
        <div className="row g-4">
          {bikes.map((bike) => (
            <div key={bike.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <BikeCard
                bike={bike}
                onEdit={handleModification}
                onDelete={handleRemoval}
                onToggleActive={handleToggleOperationalStatus}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center mt-4">No vehicles found.</p>
      )}

      {/* 🔹 Insert/Modify Overlay */}
      <Modal show={isModalVisible} onHide={clearOverlay} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentVehicleToModify ? "Modify Vehicle" : "Insert New Vehicle"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmission}>
            {["title", "registration_no", "category", "paint_color"].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label>
                  {field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Form.Label>
                <Form.Control
                  name={field}
                  value={inputData[field]}
                  onChange={handleInputAlteration}
                  required={field !== "paint_color"}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-2">
              <Form.Label>Rental Cost per Hour</Form.Label>
              <Form.Control
                type="number"
                name="rental_cost_per_hour"
                value={inputData.rental_cost_per_hour}
                onChange={handleInputAlteration}
                required
              />
            </Form.Group>

            {/* 🆕 Image Uploader with required visual cue */}
            <Form.Group className="mb-3">
              <Form.Label>
                Vehicle Picture <span className="text-danger">*</span>
              </Form.Label>
              <div
                style={{
                  border: imageError ? "2px solid red" : "none",
                  borderRadius: "8px",
                  padding: imageError ? "4px" : "0",
                }}
              >
                <ImageUploader value={inputData.image_url} onChange={handleImageAlteration} />
              </div>
              {imageError && (
                <small className="text-danger">Image is required for new vehicles.</small>
              )}
            </Form.Group>

            <Button type="submit" className="mt-3 w-100" disabled={isProcessing}>
              {isProcessing ? (
                <Spinner animation="border" size="sm" />
              ) : currentVehicleToModify ? (
                "Update Vehicle"
              ) : (
                "Insert Vehicle"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
