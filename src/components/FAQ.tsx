import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Jaka jest zniżka na przedsprzedaż?',
      answer: 'Oferujemy 40% zniżki na wszystkie zamówienia przedsprzedażowe naszych materiałów do budowy tarasów kompozytowych.',
    },
    {
      question: 'Jak długo trwa okres przedsprzedaży?',
      answer: 'Okres przedsprzedaży zazwyczaj trwa 30 dni. Sprawdź naszą stronę internetową, aby uzyskać najbardziej aktualne informacje.',
    },
    {
      question: 'Kiedy otrzymam moje zamówienie?',
      answer: 'Zamówienia przedsprzedażowe są zazwyczaj dostarczane w ciągu 6-8 tygodni po zakończeniu okresu przedsprzedaży.',
    },
    {
      question: 'Czy mogę anulować moje zamówienie przedsprzedażowe?',
      answer: 'Tak, możesz anulować swoje zamówienie przedsprzedażowe w ciągu 14 dni od jego złożenia, aby otrzymać pełny zwrot pieniędzy.',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Często zadawane pytania</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left p-4 bg-gray-50 rounded-lg focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-green-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border border-gray-200 rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;