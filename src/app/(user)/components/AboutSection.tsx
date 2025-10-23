"use client";

import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="fw-bold">About TR Bike Rentals</h2>
          <p className="text-muted">
            Your trusted partner for two-wheeler rentals in Visakhapatnam.
            Affordable, reliable, and ready to ride anytime.
          </p>
        </motion.div>

        {/* Core Highlights */}
        <Row className="g-4">
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body>
                  <FaShieldAlt className="fs-1 text-warning mb-3" />
                  <Card.Title>Safe & Secure</Card.Title>
                  <Card.Text>
                    All bikes are well-maintained, insured, and verified for safe rides.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body>
                  <FaClock className="fs-1 text-warning mb-3" />
                  <Card.Title>Flexible Timing</Card.Title>
                  <Card.Text>
                    Rent a bike by the hour, day, or week — we work around your schedule.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body>
                  <FaMapMarkerAlt className="fs-1 text-warning mb-3" />
                  <Card.Title>Our Location</Card.Title>
                  <Card.Text>
                    Conveniently located in Visakhapatnam — pick up and return your bike with ease.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
