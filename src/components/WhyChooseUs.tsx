import React from 'react';
import { Coins, Calendar, Shield } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const reasons = [
    { icon: Coins, title: 'Oszczędzaj pieniądze', description: 'Zamów teraz i ciesz się 40% zniżką na swój zakup.' },
    { icon: Calendar, title: 'Planuj z wyprzedzeniem', description: 'Zabezpiecz swoje materiały wcześnie i planuj swój projekt z pewnością.' },
    { icon: Shield, title: 'Gwarancja ceny', description: 'Zabezpiecz najlepszą cenę teraz, chronioną przed przyszłymi podwyżkami.' },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Dlaczego warto nas wybrać</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
              <reason.icon className="w-16 h-16 mx-auto mb-6 text-green-600" />
              <h3 className="text-xl font-semibold mb-4 text-center">{reason.title}</h3>
              <p className="text-gray-600 text-center">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;