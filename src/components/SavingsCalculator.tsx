import React, { useState, useEffect } from 'react';
import { Ruler, Layers, Maximize2, ChevronUp, ChevronDown } from 'lucide-react';

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
    lengths: [3.5, 4, 4.5, 5, 5.8],
    width: 0.14,
    pricePerMeter: 50,
  },
  {
    name: 'Gardpol Premium',
    image: 'https://gardpol.pl/img/products/89/1_max.jpg?v=1727252048',
    lengths: [5.8],
    width: 0.135,
    pricePerMeter: 60,
  },
  {
    name: 'DUO',
    image: 'https://gardpol.pl/img/products/11/2_max.jpg?v=1727252048',
    lengths: [3.5, 4, 4.5, 5, 5.8],
    width: 0.148,
    pricePerMeter: 55,
  },
];

const legarLengths = [2, 2.9, 4];

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
    const discount = 0.8;

    setProducts([
      { 
        name: `Deska ${selectedDeckType.name} ${selectedDeskLength}m`, 
        regularPrice: selectedDeckType.pricePerMeter * selectedDeskLength, 
        discountedPrice: selectedDeckType.pricePerMeter * selectedDeskLength * discount, 
        quantity: deskaQuantity,
        runningMeters: deskaRunningMeters
      },
      { 
        name: `Legar ${selectedLegarLength}m`, 
        regularPrice: legarPricePerMeter * selectedLegarLength, 
        discountedPrice: legarPricePerMeter * selectedLegarLength * discount, 
        quantity: legarQuantity,
        runningMeters: legarRunningMeters
      },
      { 
        name: 'Klipsy (opak. 100 szt.)', 
        regularPrice: klipsRegularPrice,
        discountedPrice: klipsRegularPrice * discount,
        quantity: Math.ceil(klipsQuantity / 100) 
      },
      { 
        name: 'Listwa kątowa 4m', 
        regularPrice: listwaSelectRegularPrice * 4, 
        discountedPrice: (listwaSelectRegularPrice * discount) * 4, 
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
    <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Oblicz swoje oszczędności</h2>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <div className="mb-8">
            <label htmlFor="deckSize" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Maximize2 className="mr-2 text-green-600" />
              Rozmiar tarasu
            </label>
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-green-600">{deckSize} m²</span>
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
              <span>10 m²</span>
              <span>100 m²</span>
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Layers className="mr-2 text-green-600" />
              Rodzaj deski
            </label>
            <div className="grid grid-cols-3 gap-4">
              {deckTypes.map((deckType) => (
                <button
                  key={deckType.name}
                  onClick={() => {
                    setSelectedDeckType(deckType);
                    setSelectedDeskLength(deckType.lengths[0]);
                  }}
                  className={`p-2 border rounded-lg transition-all ${
                    selectedDeckType.name === deckType.name
                      ? 'border-green-500 shadow-md bg-green-50'
                      : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <img src={deckType.image} alt={deckType.name} className="w-full h-32 object-cover mb-2 rounded" />
                  <p className="text-center font-medium">{deckType.name}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Ruler className="mr-2 text-green-600" />
              Długość deski
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
              Długość legara
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
              Długość listwy kątowej
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
              Wprowadź długość listwy kątowej potrzebnej do wykończenia tarasu (opcjonalnie).
            </p>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="p-3 border-b border-green-200">Produkt</th>
                  <th className="p-3 border-b border-green-200">Ilość</th>
                  <th className="p-3 border-b border-green-200">Metry bieżące</th>
                  <th className="p-3 border-b border-green-200">Cena regularna</th>
                  <th className="p-3 border-b border-green-200">Cena po rabacie</th>
                  <th className="p-3 border-b border-green-200 bg-green-200">Oszczędność</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border-b">{product.name}</td>
                    <td className="p-3 border-b">{product.quantity}</td>
                    <td className="p-3 border-b">{product.runningMeters?.toFixed(2) || '-'}</td>
                    <td className="p-3 border-b">{formatNumber(product.regularPrice * product.quantity)} zł</td>
                    <td className="p-3 border-b">{formatNumber(product.discountedPrice * product.quantity)} zł</td>
                    <td className="p-3 border-b bg-green-50 font-medium text-green-700">
                      {formatNumber((product.regularPrice - product.discountedPrice) * product.quantity)} zł
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-green-100 font-bold">
                  <td className="p-3 border-t border-green-200" colSpan={3}>Suma</td>
                  <td className="p-3 border-t border-green-200">{formatNumber(totalRegularPrice)} zł</td>
                  <td className="p-3 border-t border-green-200">{formatNumber(totalDiscountedPrice)} zł</td>
                  <td className="p-3 border-t border-green-200 bg-green-200 text-green-800">{formatNumber(totalSavings)} zł</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="text-center bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white mb-2">Twoje całkowite oszczędności</p>
            <p className="text-5xl font-bold text-white">{formatNumber(totalSavings)} zł</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;