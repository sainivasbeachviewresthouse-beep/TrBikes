"use client";

import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaMotorcycle } from "react-icons/fa";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="position-relative text-light min-vh-100 d-flex align-items-center"
      style={{
        backgroundImage: 'url("/hero_bg.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-1"></div>

      <Container className="position-relative z-2">
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <motion.h1
              className="fw-bold mb-3"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ride the City with <span className="text-warning">TR Bike Rentals</span>
            </motion.h1>

            <motion.p
              className="lead mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Affordable, Reliable, and Exciting two-wheeler rentals in <strong>Visakhapatnam</strong>.  
              Choose your ride and explore freely!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link href="/bikes" className="btn btn-warning btn-lg fw-semibold">
                <FaMotorcycle className="me-2" />
                View & Rent Bikes
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
