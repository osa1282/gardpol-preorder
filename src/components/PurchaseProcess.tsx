import React from 'react';
import { ShoppingCart, HourglassIcon, Truck } from 'lucide-react';

const PurchaseProcess: React.FC = () => {
  const steps = [
    { icon: ShoppingCart, title: 'Złóż zamówienie', description: 'Wybierz swoje produkty i zakończ proces zakupu.' },
    { icon: HourglassIcon, title: 'Poczekaj na produkcję', description: 'Rozpoczniemy produkcję Twojego zamówienia.' },
    { icon: Truck, title: 'Odbierz dostawę', description: 'Twoje wysokiej jakości materiały tarasowe dotrą pod Twoje drzwi.' },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Jak to działa</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center mb-8 md:mb-0">
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <step.icon className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PurchaseProcess;