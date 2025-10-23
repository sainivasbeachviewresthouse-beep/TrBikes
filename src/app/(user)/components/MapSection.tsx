'use client';

import React from 'react';
import { Container } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function MapSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      
    >
      <Container fluid className="p-2">
        <div style={{ height: '400px', position: 'relative' }}>
          <iframe
          className="rounded-3 shadow-sm"
            title="TR Bike Rentals Location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.726501820891!2d83.31142!3d17.7103756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943e613271ea1%3A0xb1e381a557c7068a!2sTR%20Bike%20Rentals!5e0!3m2!1sen!2sin!4v1761218670107!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaMapMarkerAlt className="text-success me-2" />
            <a  href="https://maps.app.goo.gl/QDT3H9dFqsHrGVUN8" target="_blank" rel="noopener noreferrer" style={{ color: 'black', textDecoration: 'none' }}>TR Bike Rentals,Near </a>
          </div>
        </div>
      </Container>f
    </motion.div>
  );
}
