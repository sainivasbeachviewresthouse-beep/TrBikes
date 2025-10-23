'use client';

import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { sendEnquiry } from '@/utils/sendEnquiry';
import { motion } from 'framer-motion';

interface Props {
  bike?: string;
  onSuccess?: () => void;
}

export default function BookingForm({ bike, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    rentalDate: '',
    rentalHours: 1,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, contact, rentalDate, rentalHours } = formData;

    if (!name || !contact || !rentalDate || !rentalHours) {
      setError('Please fill all fields.');
      return;
    }

    setError('');
    try {
      sendEnquiry({
        name,
        contact,
        bike,
        message: `Bike Booking Request:\nBike: ${bike}\nRental Date: ${rentalDate}\nHours: ${rentalHours}`,
      });

      setSuccess(true);
      setFormData({
        name: '',
        contact: '',
        rentalDate: '',
        rentalHours: 1,
      });

      if (onSuccess) onSuccess();
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      setError('Failed to send booking request.');
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const fields = [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'contact', type: 'tel', label: 'Contact Number' },
    { name: 'rentalDate', type: 'date', label: 'Rental Date' },
    { name: 'rentalHours', type: 'number', label: 'Rental Duration (Hours)', min: 1 },
  ];

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">WhatsApp chat opened!</Alert>}

      <Form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            className="mb-3"
          >
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              min={field.min}
              placeholder={field.label}
            />
          </motion.div>
        ))}
        <Button variant="success" type="submit" className="w-100">
          Book via WhatsApp
        </Button>
      </Form>
    </Container>
  );
}
