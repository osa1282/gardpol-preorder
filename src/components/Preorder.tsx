import React from 'react';

const Preorder: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Przedsprzedaż - Zamów już teraz i oszczędź 40%!</h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Marzysz o nowym tarasie, ale myślisz, że musisz czekać na sezon letni, by ruszyć z zakupami? Mamy dla Ciebie wyjątkową ofertę! W ramach zimowego PreOrderu, możesz kupić nasze deski kompozytowe i systemy tarasowe z rabatem aż 40%!
          </p>

          <h2 className="text-2xl font-semibold mb-4">Dlaczego warto skorzystać z przedsprzedaży?</h2>
          <p className="mb-6">
            Zamówienie w zimie pozwala na uniknięcie sezonowych podwyżek cen, a dzięki Twojej cierpliwości możesz zaoszczędzić znaczną kwotę.
          </p>

          <h3 className="text-xl font-semibold mb-4">Przykład dla tarasu o powierzchni 20 m2:</h3>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p className="font-bold">Regularna cena w sezonie letnim:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Deska kompozytowa: 10 000 zł</li>
              <li>Legar: [cena]</li>
              <li>Klipsy: [cena]</li>
              <li>Listwa: [cena]</li>
            </ul>
            <p className="font-bold">Razem: 10 000 zł</p>
            <p className="font-bold mt-4">Cena w przedsprzedaży: 6 000 zł</p>
          </div>

          <p className="mb-6">
            Dzięki zamówieniu teraz, oszczędzasz 4 000 zł, które możesz przeznaczyć na inne elementy wykończenia lub dodatki do swojego tarasu. Wszystko, co musisz zrobić, to złożyć zamówienie dziś i poczekać na realizację, która potrwa 3 miesiące. To naprawdę opłacalna inwestycja, jeśli cenisz sobie korzystne zakupy!
          </p>

          <h2 className="text-2xl font-semibold mb-4">Jak to działa?</h2>
          <ol className="list-decimal list-inside mb-6">
            <li className="mb-2">Złóż zamówienie już dziś – korzystaj z wyjątkowej zimowej promocji i ciesz się ceną niższą o 40%.</li>
            <li className="mb-2">Poczekaj na realizację – proces realizacji zamówienia trwa około 3 miesiące, co pozwala nam precyzyjnie przygotować Twój produkt.</li>
            <li>Odbierz towar na wiosnę – w idealnym momencie, by rozpocząć budowę tarasu.</li>
          </ol>

          <h2 className="text-2xl font-semibold mb-4">Dlaczego PreOrder?</h2>
          <ul className="list-disc list-inside mb-6">
            <li className="mb-2">Oszczędność 40% – zainwestowane 6 000 zł zamiast 10 000 zł to realna korzyść finansowa.</li>
            <li className="mb-2">Bez presji czasu – zamawiając wcześniej, masz pewność, że dostaniesz towar na czas, zanim ruszy sezon budowy tarasów.</li>
            <li>Gwarancja ceny – mimo zmieniających się cen w sezonie, Twój zakup w PreOrderze jest chroniony przed podwyżkami.</li>
          </ul>

          <p className="text-lg font-semibold mb-6">
            Nie czekaj na sezon letni i zamów już teraz! Wykorzystaj okazję, która się nie powtórzy i zainwestuj w przyszłość swojego tarasu z ogromnymi oszczędnościami!
          </p>

          <div className="text-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg">
              Zamów teraz w przedsprzedaży
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preorder;