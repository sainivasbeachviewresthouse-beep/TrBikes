'use client';

import React from 'react';
import SideDrawer from './SideDrawer';
import BookingForm from './BookingForm';

interface Props {
  show: boolean;
  onClose: () => void;
  bike?: string; // the name of the bike being booked
}

export default function BookingDrawer({ show, onClose, bike }: Props) {
  return (
    <SideDrawer
      show={show}
      onClose={onClose}
      title={bike ? `Book ${bike}` : 'Book a Bike'}
    >
      <BookingForm bike={bike} onSuccess={onClose} />
    </SideDrawer>
  );
}
