'use client';

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const galleryImages = ['bike1.webp', 'bike2.webp', 'bike3.webp'];

export default function GalleryPreview() {
  return (
    <Container className="py-5 text-center">
      <motion.h2
        className="fw-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Gallery Preview
      </motion.h2>
      <Row>
        {galleryImages.map((img, i) => (
          <Col md={4} key={i} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Image
                src={`/gallery/${img}`}
                alt={`Gallery ${i + 1}`}
                width={400}
                height={300}
                className="rounded-4 shadow-sm w-100"
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </Col>
        ))}
      </Row>
      <Link href="/gallery">
        <Button variant="outline-success">View Full Gallery</Button>
      </Link>
    </Container>
  );
}
