import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import TestimonialCard from './TestimonialCard';
import { motion, useAnimation } from 'framer-motion';
import { Testimonial } from '../types/testimonial';

// Funkcja komponentu TestimonialsSlider
export default function TestimonialsSlider() {
  // Stan do przechowywania aktualnego indeksu slajdu
  const [currentIndex, setCurrentIndex] = useState(0);
  // Stan do kontrolowania przeciągania
  const [isDragging] = useState(false);
  // Liczba elementów na stronę
  const itemsPerPage = 3;
  // Całkowita liczba slajdów
  const totalSlides = Math.ceil(testimonials.length / itemsPerPage);
  const controls = useAnimation();


  // Funkcja do przejścia do następnego slajdu
  const nextSlide = () => {
    if (currentIndex < testimonials.length - itemsPerPage) {
      setCurrentIndex(prev => prev + itemsPerPage);
    }
  };

  // Funkcja do przejścia do poprzedniego slajdu
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - itemsPerPage);
    }
  };

  // Zmodyfikowana funkcja goToSlide
  const goToSlide = (index: number) => {
    setCurrentIndex(index * itemsPerPage);
  };

  // Użycie efektu do automatycznego przechodzenia slajdów
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (!isDragging) {
          // Jeśli jesteśmy na końcu, wracamy do początku
          if (prevIndex >= testimonials.length - itemsPerPage) {
            return 0;
          }
          // W przeciwnym razie przechodzimy do następnego zestawu
          return prevIndex + itemsPerPage;
        }
        return prevIndex;
      });
    }, 5000); // Co 5 sekundy
  
    return () => clearInterval(timer); // Czyści timer po odmontowaniu komponentu
  }, [isDragging, itemsPerPage, testimonials.length]);

  // Widoczne opinie
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);
  if (visibleTestimonials.length < itemsPerPage) {
    const remaining = itemsPerPage - visibleTestimonials.length; // Oblicza pozostałe opinie
    visibleTestimonials.push(...testimonials.slice(0, remaining)); // Dodaje brakujące opinie
  }

  const slidePosition = -(currentIndex * (100 / itemsPerPage));

  useEffect(() => {
    controls.start({ x: `${slidePosition}%` });
  }, [currentIndex, controls, slidePosition]);

  return (
    <div className="bg-[#f9fafb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative px-4 pb-12">
          <div className="overflow-hidden mb-8">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200
              }}
            >
              {testimonials.map((testimonial: Testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 p-4"
                  style={{ flex: '0 0 calc(33.333% - 1rem)' }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-[45%] -translate-y-1/2 p-2 rounded-full bg-white shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 z-10 
              ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= testimonials.length - itemsPerPage}
            className={`absolute right-0 top-[45%] -translate-y-1/2 p-2 rounded-full bg-white shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 z-10
              ${currentIndex >= testimonials.length - itemsPerPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-green-600" />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentIndex / itemsPerPage === index ? 'bg-green-600 w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}