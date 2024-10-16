import React, { useState, useEffect } from 'react';

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

    const legarPricePerMeter = 15;

    setProducts([
      { 
        name: `Deska ${selectedDeckType.name} ${selectedDeskLength}m`, 
        regularPrice: selectedDeckType.pricePerMeter * selectedDeskLength, 
        discountedPrice: selectedDeckType.pricePerMeter * selectedDeskLength * 0.6, 
        quantity: deskaQuantity,
        runningMeters: deskaRunningMeters
      },
      { 
        name: `Legar ${selectedLegarLength}m`, 
        regularPrice: legarPricePerMeter * selectedLegarLength, 
        discountedPrice: legarPricePerMeter * selectedLegarLength * 0.6, 
        quantity: legarQuantity,
        runningMeters: legarRunningMeters
      },
      { 
        name: 'Klipsy (opak. 100 szt.)', 
        regularPrice: 100, 
        discountedPrice: 60, 
        quantity: Math.ceil(klipsQuantity / 100) 
      },
      { 
        name: 'Listwa kątowa 4m', 
        regularPrice: 80, 
        discountedPrice: 48, 
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

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Oblicz swoje oszczędności</h2>
        <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <label htmlFor="deckSize" className="block text-lg font-medium text-gray-700 mb-2">
              Rozmiar tarasu
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="deckSize"
                min="10"
                max="100"
                value={deckSize}
                onChange={(e) => setDeckSize(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-4 text-2xl font-bold text-green-600">{deckSize} m²</span>
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">
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
                      ? 'border-green-500 shadow-md'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <img src={deckType.image} alt={deckType.name} className="w-full h-32 object-cover mb-2 rounded" />
                  <p className="text-center font-medium">{deckType.name}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">
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
                      : 'bg-gray-200 hover:bg-green-100'
                  }`}
                >
                  {length} m
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">
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
                      : 'bg-gray-200 hover:bg-green-100'
                  }`}
                >
                  {length} m
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <label htmlFor="listwaLength" className="block text-lg font-medium text-gray-700 mb-2">
              Długość listwy kątowej
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="listwaLength"
                min="0"
                step="0.1"
                value={listwaLength}
                onChange={(e) => setListwaLength(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md text-lg"
              />
              <span className="ml-2 text-lg">m</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Wprowadź długość listwy kątowej potrzebnej do wykończenia tarasu (opcjonalnie).
            </p>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border-b">Produkt</th>
                  <th className="p-3 border-b">Ilość</th>
                  <th className="p-3 border-b">Metry bieżące</th>
                  <th className="p-3 border-b">Cena regularna</th>
                  <th className="p-3 border-b">Cena po rabacie</th>
                  <th className="p-3 border-b">Oszczędność</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border-b">{product.name}</td>
                    <td className="p-3 border-b">{product.quantity}</td>
                    <td className="p-3 border-b">{product.runningMeters?.toFixed(2) || '-'}</td>
                    <td className="p-3 border-b">{(product.regularPrice * product.quantity).toFixed(2)} zł</td>
                    <td className="p-3 border-b">{(product.discountedPrice * product.quantity).toFixed(2)} zł</td>
                    <td className="p-3 border-b">{((product.regularPrice - product.discountedPrice) * product.quantity).toFixed(2)} zł</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-green-100 font-bold">
                  <td className="p-3 border-t" colSpan={3}>Suma</td>
                  <td className="p-3 border-t">{totalRegularPrice.toFixed(2)} zł</td>
                  <td className="p-3 border-t">{totalDiscountedPrice.toFixed(2)} zł</td>
                  <td className="p-3 border-t">{totalSavings.toFixed(2)} zł</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="text-center bg-green-600 p-6 rounded-lg">
            <p className="text-lg text-white mb-2">Twoje całkowite oszczędności</p>
            <p className="text-5xl font-bold text-white">{totalSavings.toFixed(2)} zł</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;