"use client";

import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Bike } from "@/types/bike";

interface BikeCardProps {
  bike: Bike;
}

export default function Bikecard({ bike }: BikeCardProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to bike details page using bike name
    router.push(`/bikes/${encodeURIComponent(bike.name)}`);
  };

  return (
    <Card
      className="shadow-sm h-100 cursor-pointer"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
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
        <Badge bg={bike.availability ? "success" : "secondary"}>
          {bike.availability ? "Available" : "Unavailable"}
        </Badge>
      </Card.Body>
    </Card>
  );
}
