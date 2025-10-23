"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useBikeStore } from "@/store/useBikeStore";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import Loader from "../../components/Loader";
import BookingDrawer from "../../components/BookingDrawer";
import EnquiryDrawer from "../../components/EnquiryDrawer";
import { Bike } from "@/types/bike";
import Image from "next/image";

interface BikeDetailsClientProps {
  name: string;
}

export default function BikeDetailsClient({ name }: BikeDetailsClientProps) {
  const { bikes, setBikes } = useBikeStore();
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    const found = bikes.find(
      (b) => b.name.toLowerCase() === name.toLowerCase()
    );

    if (found) {
      setBike(found);
      setLoading(false);
    } else {
      const fetchBike = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/bikes");
          const data = await res.json();
          if (data.success) {
            setBikes(data.data);
            const matched = data.data.find(
              (b: Bike) => b.name.toLowerCase() === name.toLowerCase()
            );
            setBike(matched || null);
          }
        } catch (err) {
          console.error("Failed to fetch bike:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBike();
    }
  }, [name, bikes, setBikes]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Loader />
      </div>
    );
  }

  if (!bike) {
    return (
      <Container className="py-5 text-center">
        <h4>Bike not found</h4>
        <p className="text-muted">Please check the URL or go back to the bikes list.</p>
        <Link href="/bikes" replace className="btn btn-success">
          ← Back to Bikes
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <Image
              src={bike.image_url || "/bike-placeholder.jpg"}
              height={550}
              width={550}   
              alt={bike.name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h2 className="mb-0">{bike.name}</h2>
              <Link
                href="/bikes"
                replace
                className="btn btn-outline-success btn-sm fw-bold"
              >
                ← Back to Bikes
              </Link>
            </div>

            <Badge
              bg={bike.availability ? "success" : "secondary"}
              className="mb-3"
            >
              {bike.availability ? "Available" : "Unavailable"}
            </Badge>

            <p className="text-muted mb-2">
              <strong>Category:</strong> {bike.category}
            </p>
            <p className="text-muted mb-2">
              <strong>Color:</strong> {bike.color}
            </p>
            <p className="fs-5 fw-semibold mb-3">
              ₹{bike.rent_per_hour} / hour
            </p>

            <div className="d-flex gap-3 mt-3">
              <Button
                variant="success"
                size="lg"
                disabled={!bike.availability}
                onClick={() => setShowBooking(true)}
              >
                {bike.availability ? "Book This Bike" : "Currently Unavailable"}
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowEnquiry(true)}
              >
                Send Enquiry
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Booking Drawer */}
      <BookingDrawer
        show={showBooking}
        onClose={() => setShowBooking(false)}
        bike={bike.name}
      />

      {/* Enquiry Drawer */}
      <EnquiryDrawer
        show={showEnquiry}
        onClose={() => setShowEnquiry(false)}
        bike={bike.name}
      />
    </>
  );
}
