//import React from 'react';
import { Quote } from 'lucide-react';
import type { Testimonial } from '../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full mb-4">
      <Quote className="text-green-500 w-8 h-8 mb-6 flex-shrink-0" />
      
      <div className="flex-grow mb-6">
        <p className="text-gray-700 text-base leading-relaxed">
          "{testimonial.content}"
        </p>
      </div>
      
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100 flex-shrink-0">
        <div>
          <h3 className="font-semibold text-gray-900">
            {testimonial.name}
          </h3>
          <p className="text-sm text-green-600">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}