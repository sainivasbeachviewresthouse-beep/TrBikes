"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";

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

export default function UserBikesPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBikes = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/bikes");
        const data = await res.json();
        if (data.success) {
          setBikes(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch bikes");
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Available Bikes</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : bikes.length > 0 ? (
        <Row className="g-4">
          {bikes.map((bike) => (
            <Col key={bike.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                {bike.image_url && (
                  <Card.Img
                    variant="top"
                    src={bike.image_url}
                    alt={bike.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{bike.name}</Card.Title>
                  <Card.Text className="text-muted small">
                    {bike.category} – {bike.color}
                  </Card.Text>
                  <Card.Text className="fw-bold">
                    ₹{bike.rent_per_hour}/hour
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted mt-4">No bikes found.</p>
      )}
    </Container>
  );
}
