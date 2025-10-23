// components/SideDrawer.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  // Optional: allows adjusting the drawer's zIndex if needed
  zIndex?: number; 
  // Optional: allows adjusting the drawer's vertical position
  topOffset?: number; 
}

/**
 * Reusable side drawer component with overlay and Framer Motion slide-in animation.
 */
export default function SideDrawer({ show, onClose, title, children, zIndex = 1060, topOffset = 100 }: Props) {
  const drawerHeight = `calc(100vh - ${topOffset}px)`;
  
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* 🌫 Overlay */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(2px)',
              zIndex: zIndex - 10, // Overlay is below the drawer
            }}
          />

          {/* 🚪 Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className='rounded-start'
            style={{
              position: 'fixed',
              top: topOffset,
              right: 0,
              height: drawerHeight,
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#fff',
              borderRadius: '0 0 0 10px',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.2)',
              zIndex: zIndex,
              overflowY: 'auto',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 className="m-0">{title}</h4>
              <Button variant="outline-secondary" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>

            {/* Content (Passed as children) */}
            <div>
              {children}
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}