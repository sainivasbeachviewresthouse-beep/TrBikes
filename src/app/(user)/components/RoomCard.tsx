'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RoomCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ id, title, description, image, price }) => {
  return (
    <Card className="shadow-sm border-0 mb-4 h-100">
      {/* Image wrapper with overflow hidden */}
      <div
        style={{
          overflow: 'hidden',
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
          height: '200px',
          width: '100%',
        }}
      >
        <motion.img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Card body */}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text
          className="text-muted flex-grow-1"
          style={{ fontSize: '0.95rem', minHeight: '50px' }}
        >
          {description}
        </Card.Text>

        {/* Price & Button */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fw-semibold">₹{price} / night</span>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Link href={`/rooms/${id}`} passHref >
              <Button  variant="success" size="sm">View Details</Button>
            </Link>
          </motion.div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(RoomCard);
