import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import SavingsCalculator from './components/SavingsCalculator';
//import PurchaseProcess from './components/PurchaseProcess';
import FAQ from './components/FAQ';
import CustomerReviews from './components/CustomerReviews';
import Preorder from './components/Preorder';
//import DeckDesigner from './components/DeckDesigner';
import HowItWorks from './components/HowItWorks';
//import Footer from './components/Footer';

const App: React.FC = () => {
  const [deckSize, setDeckSize] = useState(20);
  const [isDeckDesignerOpen, setIsDeckDesignerOpen] = useState(false);

  // Dodajemy useEffect, aby wysyłać wysokość strony do rodzica (np. w iframe)
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
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
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <WhyChooseUs />
                <SavingsCalculator deckSize={deckSize} setDeckSize={setDeckSize} />
                {/* <button onClick={() => setIsDeckDesignerOpen(true)}>Otwórz Projektant Tarasu</button> */}
                <HowItWorks />
                <FAQ />
                <CustomerReviews />
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
