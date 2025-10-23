'use client';

import React from 'react';
import SideDrawer from './SideDrawer';
import EnquiryForm from './EnquiryForm';

interface Props {
  show: boolean;
  onClose: () => void;
  bike?: string;
}

export default function EnquiryDrawer({ show, onClose, bike }: Props) {
  return (
    <SideDrawer
      show={show}
      onClose={onClose}
      title={bike ? `Send Enquiry for ${bike}` : 'Send Enquiry'}
    >
      {/* Pass onSuccess to automatically close drawer */}
      <EnquiryForm bike={bike} onSuccess={onClose} />
    </SideDrawer>
  );
}
