'use client';

import React, { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import BookingDrawer from './BookingDrawer';

export default function AppNavbar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Bikes', path: '/bikes' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const navbarVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const linkMotion = {
    whileHover: { scale: 1.05, transition: { duration: 0.2 } },
    whileTap: { scale: 0.9 },
  };

  const showFloatingBooking = !(pathname.startsWith('/bikes/') && pathname !== '/bikes');

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={navbarVariants}>
        <Navbar
          expanded={expanded}
          expand="lg"
          bg="secondary"
          fixed="top"
          className="shadow-sm navbar-dark"
          variant="dark"
        >
          <Container>
            <Navbar.Brand as={Link} href="/" className="fw-bold fs-4 text-warning">
              TR Bike Rentals
            </Navbar.Brand>

            {/* ✅ White-colored toggle icon */}
            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              onClick={() => setExpanded(!expanded)}
              className="border-0"
            />

            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              className="custom-offcanvas text-light"
            >
              <Offcanvas.Header closeButton onHide={() => setExpanded(false)} data-bs-theme="dark">
                <Offcanvas.Title id="offcanvasNavbarLabel" className="text-light">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="ms-auto">
                  {navLinks.map((link) => (
                    <motion.div key={link.name} {...linkMotion}>
                      <Nav.Link
                        as={Link}
                        href={link.path}
                        onClick={() => setExpanded(false)}
                        style={{
                          fontWeight: pathname === link.path ? 900 : 700,
                          color: pathname === link.path ? '#FFD700' : '#f8f9fa',
                          margin: '0 0.8rem',
                        }}
                      >
                        {link.name}
                      </Nav.Link>
                    </motion.div>
                  ))}
                </Nav>

                <motion.div className="mt-3 mt-lg-0" {...linkMotion}>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setShowBooking(true);
                      setExpanded(false);
                    }}
                    style={{
                      width: '100%',
                      fontWeight: 600,
                      color: '#000',
                    }}
                  >
                    Book Now
                  </Button>
                </motion.div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </motion.div>

      {/* Booking Drawer */}
      <BookingDrawer show={showBooking} onClose={() => setShowBooking(false)} />

      {/* Floating Book Now Button */}
      {showFloatingBooking && (
        <motion.div
          className="d-lg-none floating-booking"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ zIndex: 1050 }}
        >
          <Button
            variant="warning"
            onClick={() => setShowBooking(true)}
            style={{
              borderRadius: '50px',
              padding: '0.6rem 1rem',
              fontWeight: 600,
              color: '#000',
            }}
          >
            Book Now
          </Button>
        </motion.div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        :root {
          --bs-secondary-rgb: 15, 23, 42; /* Deep navy-dark tone */
        }

        .navbar-dark .nav-link:hover {
          color: #ffd700 !important;
        }

        .custom-offcanvas.offcanvas {
          transition: transform 0.6s ease-in-out !important;
          backdrop-filter: blur(10px);
          width: 70% !important;
          background: rgba(17, 24, 39, 0.95);
          color: #f8f9fa;
        }

        .offcanvas-backdrop.show {
          backdrop-filter: blur(5px);
          background-color: rgba(0, 0, 0, 0.4) !important;
          transition: backdrop-filter 0.4s ease, background-color 0.4s ease;
        }

        .floating-booking {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          z-index: 1040;
        }

        .floating-booking button {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}
