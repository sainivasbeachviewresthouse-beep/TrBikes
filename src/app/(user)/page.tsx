import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import AmenitiesSection from "./components/AmenitiesSection";
import GalleryPreview from "./components/GalleryPreview";
import Testimonials from "./components/Testimonials";
import MapSection from "./components/MapSection";

export default function Home() {
  return (
    
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='mt-3'>
      <HeroSection />
      <AboutSection />
      <AmenitiesSection />
      <GalleryPreview />
      <Testimonials />
      <MapSection />
    </div>
  );
}
