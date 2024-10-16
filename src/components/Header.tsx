import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">GARDPOL</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Strona główna</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Produkty</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">O nas</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Współpraca</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Przedsprzedaż</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Pomoc</a>
          </nav>
          <a href="#" className="hidden md:flex items-center text-green-600 hover:text-green-700 transition duration-300">
            <Phone className="w-5 h-5 mr-2" />
            Kontakt
          </a>
          <button 
            className="md:hidden text-gray-600" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Przełącz menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-gray-50">
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Strona główna</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Produkty</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">O nas</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Współpraca</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Przedsprzedaż</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">Pomoc</a>
            <a href="#" className="text-green-600 hover:text-green-700 transition duration-300 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Kontakt
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;