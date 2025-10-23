"use client";

import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaHardHat, FaGasPump, FaTools, FaLifeRing } from "react-icons/fa";

const AmenitiesSection = () => {
  return (
    <section className="py-5">
      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="fw-bold">Our Amenities</h2>
          <p className="text-muted">
            TR Bike Rentals provides everything you need for a safe and enjoyable ride.
          </p>
        </motion.div>

        {/* Amenities Cards */}
        <Row className="g-4">
          <Col md={3} sm={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="text-center h-100 border-0 shadow-sm p-3">
                <FaHardHat className="fs-1 text-warning mb-3" />
                <Card.Title>Helmets Provided</Card.Title>
                <Card.Text>
                  All bikes come with certified helmets for your safety.
                </Card.Text>
              </Card>
            </motion.div>
          </Col>

          <Col md={3} sm={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="text-center h-100 border-0 shadow-sm p-3">
                <FaGasPump className="fs-1 text-warning mb-3" />
                <Card.Title>Fuel Included</Card.Title>
                <Card.Text>
                  Bikes come with a full tank for your convenience.
                </Card.Text>
              </Card>
            </motion.div>
          </Col>

          <Col md={3} sm={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="text-center h-100 border-0 shadow-sm p-3">
                <FaTools className="fs-1 text-warning mb-3" />
                <Card.Title>Well-Maintained Bikes</Card.Title>
                <Card.Text>
                  Regular servicing ensures safe and smooth rides every time.
                </Card.Text>
              </Card>
            </motion.div>
          </Col>

          <Col md={3} sm={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="text-center h-100 border-0 shadow-sm p-3">
                <FaLifeRing className="fs-1 text-warning mb-3" />
                <Card.Title>24/7 Support</Card.Title>
                <Card.Text>
                  We are always available to assist you during your ride.
                </Card.Text>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AmenitiesSection;
