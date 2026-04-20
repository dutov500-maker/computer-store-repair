import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReviewsSection } from '@/components/HomePage/ReviewsSection';
import { initializeStorage } from '@/lib/localStorage';

const Reviews = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white page-transition">
      <Header />
      <section className="py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Customer Voice
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              Отзывы
              <br />
              <span className="text-[#FF6B00]">клиентов</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl">
              Честные отзывы от владельцев наших сборок.
              Реальные эмоции, реальные результаты.
            </p>
          </div>
        </div>
      </section>
      <div>
        <ReviewsSection fullPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
