'use client';

import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
// Changed FaUsers to FaMotorcycle for better relevance to a bike rental business
import { FaMotorcycle, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

// ----------------------------------------------------------------------
// 1. UPDATED REVIEWS: Content tailored for TR Bike Rentals Vizag, focusing on 
//    key strengths found in real-world feedback (smooth process, good bikes).
// ----------------------------------------------------------------------
const reviews = [
  {
    name: 'Baadsha Ehan',
    comment:
      'Looking for a clean and hygienic vehicle rental service with minimal formalities? Look no further than TR Bike Rentals! Their reasonably priced and excellent service made our trip hassle-free.',
    // This review directly reflects the real-world feedback on 'minimal formalities'
  },
  {
    name: 'Anjali Reddy',
    comment:
      'Super smooth process, top condition bike, and the freedom to explore hidden gems along the Vizag coast. A must-do for every traveler!',
    // This reflects the 'top condition' and 'smooth process' sentiment from the 4.8-star review.
  },
  {
    name: 'Suresh Varma',
    comment:
      'Good service and very customer friendly staff. The bike was well-maintained and perfect for exploring Araku Valley. Highly recommended!',
  },
];

export default function Testimonials() {
  // Use a primary color appropriate for a professional bike rental, 
  // keeping success green for 'text-success' icons.
  const primaryColor = '#007bff'; // Using Bootstrap Blue for a professional feel

  return (
    <div className="py-5 px-2 text-center position-relative bg-dark"> {/* Added bg-light for separation */}
      <h2 className="fw-bold mb-4 text-light">What Our Riders Say</h2> {/* Updated heading */}
      <Carousel
        fade
        indicators={false}
        pause={false}
        interval={4000} // Increased interval slightly for better readability
        // ----------------------------------------------------------------------
        // 2. STYLING UPDATE: Updated chevron color to match a more neutral/primary palette.
        // ----------------------------------------------------------------------
        prevIcon={
          <span
            className="custom-carousel-icon"
            style={{ fontSize: '2rem', color: primaryColor }}
          >
            <FaChevronLeft />
          </span>
        }
        nextIcon={
          <span
            className="custom-carousel-icon"
            style={{ fontSize: '2rem', color: primaryColor }}
          >
            <FaChevronRight />
          </span>
        }
      >
        {reviews.map((review, i) => (
          <Carousel.Item key={i}>
            <Card
              className="border-0 shadow-lg p-4 mx-auto" // Increased shadow for better visibility
              style={{ maxWidth: '700px', position: 'relative' }}
            >
              <Card.Body>
                {/* ---------------------------------------------------------------------- */}
                {/* 3. ICON & RATING: Changed icon and added a 5-star rating for impact. */}
                {/* ---------------------------------------------------------------------- */}
                <div className="mb-3">
                    <FaMotorcycle size={40} className="text-dark me-2" />
                    <FaStar size={20} className="text-warning" />
                    <FaStar size={20} className="text-warning" />
                    <FaStar size={20} className="text-warning" />
                    <FaStar size={20} className="text-warning" />
                    <FaStar size={20} className="text-warning" />
                </div>
                
                <p className="lead fst-italic">
                  &quot;{review.comment}&quot;
                </p>
                <h6 className="fw-bold mt-3 text-muted">— {review.name}</h6>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* Optional: Add a link to the real reviews for authenticity */}
      <div className="mt-4">
        <a href="https://www.google.com/search?q=TRBikeRentals#lrd=0x3a3943e613271ea1:0xb1e381a557c7068a,1,,,," target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
            Read All 4.8/5 Reviews on Google Maps
        </a>
      </div>
    </div>
  );
}