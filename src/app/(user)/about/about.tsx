'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsBicycle, BsPeopleFill, BsShieldCheck } from 'react-icons/bs';

export default function AboutPage() {
  const features = [
    {
      icon: <BsBicycle size={30} />,
      title: 'Wide Range of Bikes',
      description:
        'From scooters to sport bikes — we’ve got a ride for every need and budget. Choose what suits your journey best.',
    },
    {
      icon: <BsPeopleFill size={30} />,
      title: 'Local Trusted Service',
      description:
        'Serving Visakhapatnam riders with reliability and transparency. Our goal is to make every ride smooth and worry-free.',
    },
    {
      icon: <BsShieldCheck size={30} />,
      title: 'Safe & Well-Maintained',
      description:
        'All our bikes are regularly serviced and sanitized to ensure your safety on the road.',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h1>TR Bike Rentals</h1>
        <p className="text-muted fs-5 text-justify">
          Explore Visakhapatnam at your own pace with our affordable and reliable bike rentals. 
          Freedom, convenience, and adventure on two wheels.
        </p>
      </motion.div>
      {/* Story Section */}
      <Row className="align-items-center mb-5">
        <Col md={7} sm={6} >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="fw-bold">Our Story</h3>
            <p className="text-justify">
              TR Bike Rentals was started in Visakhapatnam with a simple vision — 
              to make exploring our beautiful coastal city easier and more fun. 
              Whether you’re a local commuter, a tourist, or a weekend explorer, 
              we provide hassle-free bike rentals for everyone.
            </p>
            <p className="text-justify">
              Our mission is to offer quality bikes, transparent pricing, and friendly service. 
              We believe riding should be easy — no hidden costs, no complications, just smooth rides 
              across Vizag’s scenic roads and beaches.
            </p>
          </motion.div>
        </Col>
        <Col md={5} sm={6}>
          <motion.img
            src="about.webp" // Replace with your actual image
            alt="TR Bike Rentals Visakhapatnam"
            className="img-fluid rounded shadow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="g-4 mb-5">
        {features.map((feature, i) => (
          <Col md={4} key={feature.title}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={cardVariants}
            >
              <Card className="p-4 shadow-sm text-center h-100">
                <div className="mb-3" style={{ color: '#0d6efd' }}>
                  {feature.icon}
                </div>
                <h5>{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Call-to-Action */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/bikes">
          <Button variant="primary" size="lg">
            Rent a Bike Now
          </Button>
        </Link>
      </motion.div>
    </Container>
  );
}
