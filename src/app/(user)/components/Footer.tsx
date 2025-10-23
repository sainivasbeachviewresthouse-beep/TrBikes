'use client';

import { Container, Row, Col, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import React from 'react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: '#1a1a1a',
        color: '#f8f9fa',
        paddingTop: '3rem',
        paddingBottom: '2rem',
      }}
    >
      <Container>
        <Row className="gy-4">
          {/* About Section */}
          <Col md={4}>
            <h5 style={{ color: '#d2220bff', fontWeight: 600 }}className="fw-bold">
              TR Bike Rentals
            </h5>
            <p style={{ fontSize: '0.95rem', marginTop: '0.8rem', color: '#ddd' }}>
              TR Bike Rentals offers a wide range of bikes for rent in Visakhapatnam. 
    Choose from scooters, motorcycles, and electric bikes for your daily 
    rides or weekend trips. Convenient booking, reliable bikes, and 
    excellent customer service make your ride hassle-free.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5 style={{ color: '#eab103ff', fontWeight: 600 }}>Quick Links</h5>
            <Nav className="flex-column mt-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/bikes', label: 'Bikes' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact' },
              ].map((link, idx) => (
                <Nav.Link
                  key={idx}
                  as={Link}
                  href={link.href}
                  style={{
                    color: '#ccc',
                    marginBottom: '0.4rem',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          {/* Contact Info */}
          <Col md={4}>
            <h5 style={{ color: '#30a7fbff', fontWeight: 600 }}>Contact Us</h5>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                marginTop: '0.8rem',
                fontSize: '0.95rem',
                color: '#ddd',
              }}
            >
              {/* Address */}
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <HiLocationMarker size={18} style={{ marginRight: '8px', color: '#27e5e2ff' }} />
                <a
                  href="https://maps.app.goo.gl/QDT3H9dFqsHrGVUN8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ddd', textDecoration: 'none' }}
                >
                  Vintage Bar Backside, 5th Floor RK Residency
                </a>
              </li>

              {/* Phone */}
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <FaPhoneAlt size={16} style={{ marginRight: '8px', color: '#20c997' }} />
                <a
                  href="tel:+91 98853 42733"
                  style={{ color: '#ddd', textDecoration: 'none' }}
                >
                  +91 95533 55118
                </a>
              </li>

              {/* Email */}
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <FaEnvelope size={16} style={{ marginRight: '8px', color: '#20c997' }} />
                <a
                  href="mailto:sainivasbeachviewresthouse@gmail.com"
                  style={{ color: '#ddd', textDecoration: 'none' }}
                >
                  sainivasbeachviewresthouse@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-3" style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.facebook.com/share/1NhAmUqWqB/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" style={{ transition: 'color 0.3s ease' }}>
                <FaFacebook color="#1d8ad8ff" size={22} className="hover-green" />
              </a>
              <a href="https://www.instagram.com/sai_nivas_rest_house/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" style={{ transition: 'color 0.3s ease' }}>
                <FaInstagram color="#8f0bdbff" size={22} className="hover-green" />
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ margin: '2rem 0', borderColor: '#333' }} />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
          style={{ fontSize: '0.9rem', color: '#aaa' }}
        >
          © {new Date().getFullYear()} SaiNivas Rest House. All rights reserved. <br />
          Developed by <a href="https://awezens.com" target="_blank" rel="noopener noreferrer" style={{ color: '#20c997',textDecoration: 'none'  }}>Awezens</a>
        </motion.div>
      </Container>

      {/* Optional: Hover effect for social icons */}
      <style jsx>{`
        .hover-green:hover {
          color: #10b981 !important;
        }
      `}</style>
    </motion.footer>
  );
}
