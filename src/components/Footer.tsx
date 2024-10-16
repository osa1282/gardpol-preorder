import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GARDPOL</h3>
            <p className="text-gray-400">Wysokiej jakości materiały do budowy tarasów kompozytowych dla Twojej przestrzeni na zewnątrz.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Strona główna</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Produkty</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">O nas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <address className="text-gray-400 not-italic">
              <p>ul. Tarasowa 123</p>
              <p>00-000 Warszawa</p>
              <p>Telefon: (22) 123-45-67</p>
              <p>Email: info@gardpol.pl</p>
            </address>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Śledź nas</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} GARDPOL. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;