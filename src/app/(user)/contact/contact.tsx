'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import EnquiryForm from '../components/EnquiryForm';
import { BsWhatsapp, BsTelephone, BsEnvelope } from 'react-icons/bs';
import { motion } from 'framer-motion';
import MapSection from '../components/MapSection';

export default function ContactPage() {
  const contactCards = [
    { icon: <BsWhatsapp size={30} />, label: 'WhatsApp', value: '+919885342733', href: 'https://wa.me/919885342733', color: '#25D366' },
    { icon: <BsTelephone size={30} />, label: 'Phone', value: '+919885342733', href: 'tel:+919885342733', color: '#0d6efd' },
    { icon: <BsEnvelope size={30} />, label: 'Email', value: 'sainivasbeachviewresthouse@gmail.com', href: 'mailto:sainivasbeachviewresthouse@gmail.com', color: '#dc3545' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.5 } }),
  };

  const motionCard = {
    whileHover: { scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
    whileTap: { scale: 0.97 },
  };

  return (
    <>
      <Container className="py-5">
        <h1 className="text-center mb-5">Contact Us</h1>

        <Row className="align-items-start g-4">
          {/* Left: Contact Info */}
          <Col lg={5} md={12}>
            {contactCards.map((card, i) => (
              <motion.a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                animate="visible"
                custom={i}
                variants={cardVariants}
                whileHover={motionCard.whileHover}
                whileTap={motionCard.whileTap}
                style={{ textDecoration: 'none', display: 'block' ,borderRadius: '10px', cursor: 'pointer'}}
                className='shadow-sm m-2'
              >
                <Card
                  className="p-3  d-flex align-items-center flex-row "
                  style={{  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      backgroundColor: card.color,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      marginRight: '1rem',
                      flexShrink: 0,
                    }}
                  >
                    {card.icon}
                  </div>

                  {/* Label + Value */}
                  <div className='d-flex flex-column flex-grow-1 text-truncate'> 
                    <h6 className="mb-1 text-truncate">{card.label}</h6>
                    <span className='text-truncate' style={{ color: '#333', fontWeight: 500}}>{card.value}</span>
                  </div>
                </Card>
              </motion.a>
            ))}
          </Col>

          {/* Right: Contact Form */}
          <Col lg={7} md={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <EnquiryForm />
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MapSection />
      </motion.div>
    </>
  );
}
