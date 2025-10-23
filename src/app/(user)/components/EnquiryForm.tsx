'use client';

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { sendEnquiry } from '@/utils/sendEnquiry';
import { motion } from 'framer-motion';

interface Props {
  bike?: string;
  onSuccess?: () => void;
}

export default function EnquiryForm({ bike, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, contact, message } = formData;

    if (!name || !contact || !message) {
      setError('Please fill all fields.');
      return;
    }

    setError('');

    try {
      sendEnquiry({ ...formData, bike });

      setSuccess(true);
      setFormData({ name: '', contact: '', message: '' });

      if (onSuccess) onSuccess();

      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to open WhatsApp. Please try again.');
    }
  };

  // Framer Motion variants for smooth staggered animation
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const fields: { name: keyof typeof formData; type: string; label: string }[] = [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'contact', type: 'tel', label: 'Contact Number' },
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
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={`Your ${field.label}`}
            />
          </motion.div>
        ))}

        {/* Message field */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fieldVariants}
          className="mb-3"
        >
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
          />
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fieldVariants}>
          <Button variant="success" type="submit" className="w-100">
            Send via WhatsApp
          </Button>
        </motion.div>
      </Form>
    </Container>
  );
}
