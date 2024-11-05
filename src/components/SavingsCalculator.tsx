import React, { useState, useEffect } from 'react';
import { Ruler, Layers, Maximize2, ChevronUp, ChevronDown, Phone } from 'lucide-react';

interface SavingsCalculatorProps {
  deckSize: number;
  setDeckSize: (size: number) => void;
}

interface DeckType {
  name: string;
  image: string;
  lengths: number[];
  width: number;
  pricePerMeter: number;
  discount: number;
}

interface Product {
  name: string;
  regularPrice: number;
  discountedPrice: number;
  quantity: number;
  runningMeters?: number;
}

const deckTypes: DeckType[] = [
  {
    name: 'SELECT',
    image: 'https://gardpol.pl/img/products/16/1_max.jpg?v=1727252048',
    lengths: [5.8],
    width: 0.14,
    pricePerMeter: 29.57,
    discount: 0.6,
  },
  {
    name: 'Gardpol Premium',
    image: 'https://gardpol.pl/img/products/89/1_max.jpg?v=1727252048',
    lengths: [5.8],
    width: 0.135,
    pricePerMeter: 30.98,
    discount: 0.6,
  },
  {
    name: 'DUO',
    image: 'https://gardpol.pl/img/products/11/2_max.jpg?v=1727252048',
    lengths: [3.5, 4, 4.5, 5, 5.8],
    width: 0.148,
    pricePerMeter: 37.35,
    discount: 0.8,
  },
];

const legarLengths = [2.9, 4];

const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ deckSize, setDeckSize }) => {
  const [listwaLength, setListwaLength] = useState(0);
  const [selectedDeckType, setSelectedDeckType] = useState<DeckType>(deckTypes[0]);
  const [selectedDeskLength, setSelectedDeskLength] = useState(selectedDeckType.lengths[0]);
  const [selectedLegarLength, setSelectedLegarLength] = useState(legarLengths[0]);
  const [products, setProducts] = useState<Product[]>([]);

  const calculateProducts = () => {
    const deskaQuantity = Math.ceil((deckSize / selectedDeckType.width) / selectedDeskLength);
    const deskaRunningMeters = deskaQuantity * selectedDeskLength;
    const legarQuantity = Math.ceil((deckSize * 3) / selectedLegarLength);
    const legarRunningMeters = legarQuantity * selectedLegarLength;
    const klipsQuantity = Math.ceil(deckSize * 21);
    const listwaQuantity = Math.ceil(listwaLength / 4);

    const legarPricePerMeter = 17.04;
    const klipsRegularPrice = 135.28;
    const listwaSelectRegularPrice = 11.34;

    setProducts([
      { 
        name: `Deska ${selectedDeckType.name} ${selectedDeskLength}m`, 
        regularPrice: selectedDeckType.pricePerMeter * selectedDeskLength, 
        discountedPrice: selectedDeckType.pricePerMeter * selectedDeskLength * selectedDeckType.discount, 
        quantity: deskaQuantity,
        runningMeters: deskaRunningMeters
      },
      { 
        name: `Legar kompozytowy ${selectedLegarLength}m`, 
        regularPrice: legarPricePerMeter * selectedLegarLength, 
        discountedPrice: legarPricePerMeter * selectedLegarLength * 0.7, 
        quantity: legarQuantity,
        runningMeters: legarRunningMeters
      },
      { 
        name: 'Klipsy z wkrÄ™tem (100 szt.)', 
        regularPrice: klipsRegularPrice,
        discountedPrice: klipsRegularPrice * 0.7,
        quantity: Math.ceil(klipsQuantity / 100) 
      },
      { 
        name: 'Listwa kÄ…towa 4m', 
        regularPrice: listwaSelectRegularPrice * 4, 
        discountedPrice: (listwaSelectRegularPrice * 0.8) * 4, 
        quantity: listwaQuantity,
        runningMeters: listwaLength
      },
    ]);
  };

  useEffect(() => {
    calculateProducts();
  }, [deckSize, listwaLength, selectedDeckType, selectedDeskLength, selectedLegarLength]);

  const totalRegularPrice = products.reduce((sum, product) => sum + product.regularPrice * product.quantity, 0);
  const totalDiscountedPrice = products.reduce((sum, product) => sum + product.discountedPrice * product.quantity, 0);
  const totalSavings = totalRegularPrice - totalDiscountedPrice;

  const formatNumber = (num: number) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <section className="bg-[#f0f5f2] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Oblicz swoje oszczÄ™dnoÅ›ci</h2>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <div className="mb-8">
            <label htmlFor="deckSize" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Maximize2 className="mr-2 text-green-600" />
              Rozmiar tarasu
            </label>
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-green-600">{deckSize} mÂ²</span>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                id="deckSize"
                min="10"
                max="100"
                value={deckSize}
                onChange={(e) => setDeckSize(Number(e.target.value))}
                className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div 
                className="absolute h-2 bg-green-500 rounded-lg top-1 pointer-events-none" 
                style={{ width: `${((deckSize - 10) / 90) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>10 mÂ²</span>
              <span>100 mÂ²</span>
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Layers className="mr-2 text-green-600" />
              Rodzaj deski
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {deckTypes.map((deckType) => (
                <button
                  key={deckType.name}
                  onClick={() => {
                    setSelectedDeckType(deckType);
                    setSelectedDeskLength(deckType.lengths[0]);
                  }}
                  className={`p-2 border rounded-lg transition-all flex flex-col items-center ${
                    selectedDeckType.name === deckType.name
                      ? 'border-green-500 shadow-md bg-green-50'
                      : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="w-full h-32 flex items-center justify-center mb-2">
                    <img src={deckType.image} alt={deckType.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <p className="text-center font-medium">{deckType.name}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Ruler className="mr-2 text-green-600" />
              DÅ‚ugoÅ›Ä‡ deski
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedDeckType.lengths.map((length) => (
                <button
                  key={length}
                  onClick={() => setSelectedDeskLength(length)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedDeskLength === length
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-green-100 text-gray-700'
                  }`}
                >
                  {length} m
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Ruler className="mr-2 text-green-600" />
              DÅ‚ugoÅ›Ä‡ legara
            </label>
            <div className="flex flex-wrap gap-2">
              {legarLengths.map((length) => (
                <button
                  key={length}
                  onClick={() => setSelectedLegarLength(length)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedLegarLength === length
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-green-100 text-gray-700'
                  }`}
                >
                  {length} m
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <label htmlFor="listwaLength" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Ruler className="mr-2 text-green-600" />
              DÅ‚ugoÅ›Ä‡ listwy kÄ…towej
            </label>
            <div className="flex items-center">
              <div className="relative w-40">
                <input
                  type="number"
                  id="listwaLength"
                  min="1"
                  step="1"
                  value={listwaLength}
                  onChange={(e) => setListwaLength(Number(e.target.value))}
                  className="w-full p-2 pr-10 border border-gray-300 rounded-md text-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                />
                <div className="absolute inset-y-0 right-0 flex flex-col">
                  <button
                    onClick={() => setListwaLength(prev => prev + 1)}
                    className="flex-1 px-2 bg-gray-100 hover:bg-gray-200 border-l border-b border-gray-300 rounded-tr-md focus:outline-none"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => setListwaLength(prev => Math.max(0, prev - 1))}
                    className="flex-1 px-2 bg-gray-100 hover:bg-gray-200 border-l border-gray-300 rounded-br-md focus:outline-none"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              <span className="ml-2 text-lg">m</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              WprowadÅº dÅ‚ugoÅ›Ä‡ listwy kÄ…towej potrzebnej do wykoÅ„czenia tarasu (opcjonalnie).
            </p>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="p-3 border-b border-green-200">Produkt</th>
                  <th className="p-3 border-b border-green-200">IloÅ›Ä‡</th>
                  <th className="p-3 border-b border-green-200">Metry bieÅ¼Ä…ce</th>
                  <th className="p-3 border-b border-green-200">Cena regularna</th>
                  <th className="p-3 border-b border-green-200">Cena po rabacie</th>
                  <th className="p-3 border-b border-green-200 bg-green-200">OszczÄ™dnoÅ›Ä‡</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border-b">{product.name}</td>
                    <td className="p-3 border-b">{product.quantity}</td>
                    <td className="p-3 border-b">{product.runningMeters?.toFixed(2) || '-'}</td>
                    <td className="p-3 border-b">{formatNumber(product.regularPrice * product.quantity)} zÅ‚</td>
                    <td className="p-3 border-b">{formatNumber(product.discountedPrice * product.quantity)} zÅ‚</td>
                    <td className="p-3 border-b bg-green-50 font-medium text-green-700">
                      {formatNumber((product.regularPrice - product.discountedPrice) * product.quantity)} zÅ‚
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-green-100 font-bold">
                  <td className="p-3 border-t border-green-200" colSpan={3}>Suma</td>
                  <td className="p-3 border-t border-green-200">{formatNumber(totalRegularPrice)} zÅ‚</td>
                  <td className="p-3 border-t border-green-200">{formatNumber(totalDiscountedPrice)} zÅ‚</td>
                  <td className="p-3 border-t border-green-200 bg-green-200 text-green-800">{formatNumber(totalSavings)} zÅ‚</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="text-center bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white mb-2">Twoje caÅ‚kowite oszczÄ™dnoÅ›ci</p>
            <p className="text-5xl font-bold text-white mb-8">{formatNumber(totalSavings)} zÅ‚</p>
            
            <hr className="w-4/5 mx-auto border-0 h-[4px] bg-white/80 my-8 rounded-full" />
            
            <p className="text-[1.5rem] text-white mb-6">ZadzwoÅ„ juÅ¼ teraz i uzyskaj dokÅ‚adnÄ… ofertÄ™ od naszego handlowca!</p>
            <a 
              href="tel:+48799399972" 
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full text-xl font-semibold hover:bg-green-50 transition-colors"
            >
              <Phone className="w-6 h-6" />
              +48 799 399 972
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;