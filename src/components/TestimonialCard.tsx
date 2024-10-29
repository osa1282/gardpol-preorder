import { Quote } from 'lucide-react';
import type { Testimonial } from '../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col h-full mb-4">
      <Quote className="text-green-500 w-6 h-6 sm:w-8 sm:h-8 mb-4 sm:mb-6 flex-shrink-0" />
      
      <div className="flex-grow mb-4 sm:mb-6">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          "{testimonial.content}"
        </p>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100 flex-shrink-0">
        <div></div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
            {testimonial.name}
          </h3>
          <p className="text-xs sm:text-sm text-green-600">
            {testimonial.role}
          </p>
        </div>
      </div>
  );
}