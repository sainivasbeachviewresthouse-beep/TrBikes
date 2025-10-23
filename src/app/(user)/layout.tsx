import React from "react";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";
import SwipeWrapper from "./components/SwipeWrapper"; 

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
            <div className="d-flex flex-column min-vh-100 ">
          <AppNavbar />

          {/* MAIN CONTENT (auto height, handles swipe transitions) */}
          <main className="mt-5 flex-grow-1 position-relative" style={{ overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <SwipeWrapper>{children}</SwipeWrapper>
            </AnimatePresence>
          </main>

          <Footer />
        </div>

  );
}