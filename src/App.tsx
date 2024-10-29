import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import SavingsCalculator from './components/SavingsCalculator';
import FAQ from './components/FAQ';
import Preorder from './components/Preorder';
import TestimonialsSlider from './components/TestimonialsSlider';
import HowItWorks from './components/HowItWorks';
//import Footer from './components/Footer';
//import DeckDesigner from './components/DeckDesigner';
//import CustomerReviews from './components/CustomerReviews';
//import PurchaseProcess from './components/PurchaseProcess';
//import Header from './components/Header';

const App: React.FC = () => {
  const [deckSize, setDeckSize] = useState(20);
  // const [isDeckDesignerOpen, setIsDeckDesignerOpen] = useState(false);

  // Dodajemy useEffect, aby wysyłać wysokość strony do rodzica (np. w iframe)
  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ height }, '*');
    };

    // Wyślij wysokość po załadowaniu strony oraz przy każdej zmianie rozmiaru
    window.addEventListener('load', sendHeight);
    window.addEventListener('resize', sendHeight);

    // Wyślij wysokość od razu przy załadowaniu komponentu
    sendHeight();

    // Sprzątaj po odejściu komponentu
    return () => {
      window.removeEventListener('load', sendHeight);
      window.removeEventListener('resize', sendHeight);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <main className="flex-grow container mx-auto px-4">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <WhyChooseUs />
                <SavingsCalculator deckSize={deckSize} setDeckSize={setDeckSize} />
                <HowItWorks />
                <FAQ />
                <TestimonialsSlider />
              </>
            } />
            <Route path="/przedsprzedaz" element={<Preorder />} />
          </Routes>
        </main>
        {/*{isDeckDesignerOpen && (
          <div className="popup">
            <DeckDesigner />
            <button onClick={() => setIsDeckDesignerOpen(false)}>Zamknij</button>
          </div>
        )}*/}
      </div>
    </Router>
  );
}

export default App;
