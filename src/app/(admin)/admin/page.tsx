"use client";

import { useEffect, useMemo } from "react";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useBikeStore } from "@/store/useBikeStore";

export default function AdminDashboardPage() {
  const { bikes, setBikes } = useBikeStore();
  const loading = bikes.length === 0; // simple heuristic

  // Fetch bikes only if not already loaded
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch("/api/bikes");
        const data = await res.json();
        if (data.success) setBikes(data.data);
      } catch (err) {
        console.error("Error fetching bikes for dashboard:", err);
      }
    };

    if (bikes.length === 0) fetchBikes();
  }, [bikes.length, setBikes]);

  // Compute stats efficiently with useMemo
  const { totalBikes, activeBikes, inactiveBikes } = useMemo(() => {
    const total = bikes.length;
    const active = bikes.filter((b) => b.availability).length;
    const inactive = total - active;
    return { totalBikes: total, activeBikes: active, inactiveBikes: inactive };
  }, [bikes]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="p-3">
      <h2 className="mb-4 fw-bold text-primary">Dashboard Overview</h2>

      {bikes.length === 0 ? (
        <Alert variant="info">No bikes found.</Alert>
      ) : (
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow-sm border-0 text-center p-3">
              <Card.Body>
                <h5 className="text-muted">Total Bikes</h5>
                <h2 className="fw-bold text-dark">{totalBikes}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm border-0 text-center p-3">
              <Card.Body>
                <h5 className="text-success">Active Bikes</h5>
                <h2 className="fw-bold text-success">{activeBikes}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm border-0 text-center p-3">
              <Card.Body>
                <h5 className="text-danger">Inactive Bikes</h5>
                <h2 className="fw-bold text-danger">{inactiveBikes}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
