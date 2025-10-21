"use client";

import { Card, Button, Form } from "react-bootstrap";

interface BikeCardProps {
  bike: {
    id: string;
    name: string;
    registration_no: string;
    category: string;
    color: string;
    rent_per_hour: number;
    image_url?: string;
    availability?: boolean; // <-- availability
  };
  onEdit: (bike: any) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void; // new
}

export default function BikeCard({
  bike,
  onEdit,
  onDelete,
  onToggleActive,
}: BikeCardProps) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Img
        variant="top"
        src={bike.image_url || "/bike-placeholder.jpg"}
        alt={bike.name}
        style={{
          height: "180px",
          objectFit: "cover",
          borderBottom: "1px solid #eee",
        }}
      />
      <Card.Body>
        <Card.Title className="text-truncate">{bike.name}</Card.Title>
        <Card.Text className="text-muted text-truncate">
          {bike.category} • {bike.color}
        </Card.Text>
        <Card.Text className="fw-bold mb-2">
          ₹{bike.rent_per_hour}/hour
        </Card.Text>

        {/* Availability Toggle */}
        <Form.Check 
          type="switch"
          id={`toggle-${bike.id}`}
          label={bike.availability ? "Active" : "Inactive"}
          checked={bike.availability || false}
          onChange={() => onToggleActive(bike.id, !(bike.availability || false))}
          className="mb-3"
        />

        <div className="d-flex justify-content-between">
          <Button variant="warning" size="sm" onClick={() => onEdit(bike)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(bike.id)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
