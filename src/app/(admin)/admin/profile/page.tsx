'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";

interface AdminData {
  id: string;
  name: string;
  email: string;
}

export default function AdminProfilePage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("adminInfo");
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "22rem" }} className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4 fw-bold text-primary">
            Admin Profile
          </Card.Title>
          {admin ? (
            <>
              <p><strong>Name:</strong> {admin.name}</p>
              <p><strong>Email:</strong> {admin.email}</p>
              <div className="d-flex justify-content-center mt-4">
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <p className="text-muted text-center">No admin data found.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
