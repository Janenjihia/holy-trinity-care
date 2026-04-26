import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import ServiceOverview from '../components/home/ServiceOverview';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import ContactInfo from '../components/home/ContactInfo';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <ServiceOverview />
      <Testimonials />
      <CTASection />
      <ContactInfo />
    </>
  );
}