'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';
import { gallery } from '@/app/data/gallery';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Map gallery items to slides for Lightbox
  const slides = gallery.map(item => ({ src: item.src, alt: item.alt }));

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Gallery</h1>

      <Row xs={1} sm={2} md={3} className="g-4">
        {gallery.map((item, index) => (
          <Col key={item.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="shadow-sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="rounded"
                  style={{
                    width: '100%',
                    
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setPhotoIndex(index);
                    setLightboxOpen(true);
                  }}
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          index={photoIndex}
          close={() => setLightboxOpen(false)}
          slides={slides}
          animation={{ fade: 200 }}
        />
      )}
    </Container>
  );
}
