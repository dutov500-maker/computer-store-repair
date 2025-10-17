import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReviewsSection } from '@/components/HomePage/ReviewsSection';
import { initializeStorage } from '@/lib/localStorage';

const Reviews = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen page-transition">
      <Header />
      <div className="pt-20">
        <ReviewsSection fullPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;