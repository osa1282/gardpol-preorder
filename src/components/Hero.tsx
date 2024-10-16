import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import DeckModel from './DeckModel';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Odmień swoją przestrzeń na zewnątrz
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Zamów teraz i zaoszczędź 40% na premium deskach kompozytowych.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg">
            Zamów teraz
          </button>
        </div>
        <div className="md:w-1/2 h-96">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Suspense fallback={null}>
              <DeckModel />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Hero;