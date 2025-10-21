'use client';
import { Navbar, Container } from 'react-bootstrap';
import Image from 'next/image';

export default function Header() {
  return (
    <Navbar bg="white" expand="md" className="shadow-sm ">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Logo / Brand */}
        <Navbar.Brand href="/admin" className="fw-bold text-primary">
          Admin Panel
        </Navbar.Brand>

        {/* Right side: Admin profile */}
        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold">Tirumula Admin</span>
          <Image
            src="https://cdn.dotpe.in/longtail/store-logo/9434671/c1eXa4pN.webp"
            alt="Admin"
            width="35"
            height="35"
            className="rounded-circle border"
          />
        </div>
      </Container>
    </Navbar>
  );
}
