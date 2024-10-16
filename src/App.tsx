import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import SavingsCalculator from './components/SavingsCalculator';
import PurchaseProcess from './components/PurchaseProcess';
import FAQ from './components/FAQ';
import CustomerReviews from './components/CustomerReviews';
import Preorder from './components/Preorder';
import DeckDesigner from './components/DeckDesigner';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [deckSize, setDeckSize] = useState(20);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <WhyChooseUs />
                <SavingsCalculator deckSize={deckSize} setDeckSize={setDeckSize} />
                <DeckDesigner />
                <PurchaseProcess />
                <FAQ />
                <CustomerReviews />
              </>
            } />
            <Route path="/przedsprzedaz" element={<Preorder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;