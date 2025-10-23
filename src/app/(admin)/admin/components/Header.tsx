'use client';

import { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Image from 'next/image';

interface AdminData {
  id: string;
  name: string;
  email: string;
}

export default function Header() {
  const [admin, setAdmin] = useState<AdminData | null>(null);

  useEffect(() => {
    // Read admin info from localStorage (client-side only)
    const stored = localStorage.getItem('adminInfo');
    if (stored) {
      try {
        setAdmin(JSON.parse(stored));
      } catch {
        console.warn('Invalid adminInfo in localStorage');
      }
    }
  }, []);

  return (
    <Navbar bg="white" expand="md" className="shadow-sm px-3">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Left: Brand */}
        <Navbar.Brand href="/admin" className="fw-bold text-primary">
          Admin Panel
        </Navbar.Brand>

        {/* Right: Admin Profile */}
        <div className="d-flex align-items-center gap-3">
          {admin ? (
            <>
              <span className="fw-semibold">{admin.name}</span>
              <Image
                src="/image.png" // fallback image (you can replace later)
                alt="Admin"
                width={35}
                height={35}
                className="rounded-circle border"
              />
            </>
          ) : (
            <span className="text-muted small">Loading...</span>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
