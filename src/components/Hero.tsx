import React from 'react';
//import { Canvas } from 'react-three-fiber';
//import { OrbitControls } from '@react-three/drei';
//import DeckModel from './DeckModel';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Przedsprzedaż - zamów już teraz i oszczędź do 40%!
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Odkryj unikalne zalety naszej oferty i zobacz, jak możemy pomóc Ci zaoszczędzić!
          </p>
          {/* <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg">
            Zamów teraz
          </button> */}
          <div className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg flex flex-col items-center">
            <button className="mb-2">Oferta ograniczona czasowo!</button>
            <CountdownTimer 
              startDate={new Date('2024-10-17')} 
              endDate={new Date('2025-01-30')} 
            />
          </div>
        </div>
        <div className="md:w-1/2 h-96 relative overflow-hidden rounded-lg shadow-xl md:ml-8">
          <img
            src="https://gardpol.pl/img/WERONA/16_Mi%C5%84sk_Mazowiecki/Mi%C5%84sk_Mazowiecki_1.jpg"
            alt="Taras kompozytowy"
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-white text-xl font-semibold mb-2">Nowoczesny taras kompozytowy</h3>
              <p className="text-gray-200">Odkryj piękno i trwałość naszych produktów</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;