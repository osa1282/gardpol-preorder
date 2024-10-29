import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Jak długo trwa realizacja zamówienia?',
    answer: 'Standardowy czas realizacji zamówienia wynosi od 75 do 90 dni roboczych. Proces ten obejmuje produkcję, kontrolę jakości, pakowanie i dostawę.'
  },
  {
    question: 'Czy mogę śledzić status mojego zamówienia?',
    answer: 'Tak, po złożeniu zamówienia otrzymasz unikalny numer, dzięki któremu będziesz mógł śledzić jego status na naszej stronie w zakładce "Moje zamówienia".'
  },
  {
    question: 'Jakie są dostępne metody płatności?',
    answer: 'Akceptujemy płatności kartą kredytową, przelewem bankowym oraz BLIK. Oferujemy również możliwość płatności ratalnej poprzez współpracujące banki.'
  },
  {
    question: 'Czy mogę zmienić lub anulować zamówienie?',
    answer: 'Zmiana lub anulowanie zamówienia jest możliwe do 24 godzin po złożeniu zamówienia. Po tym czasie, ze względu na rozpoczęcie procesu produkcyjnego, nie ma możliwości wprowadzania zmian.'
  },
  {
    question: 'Czy oferujecie gwarancję na produkty?',
    answer: 'Tak, wszystkie nasze produkty objęte są 24-miesięczną gwarancją producenta. Gwarancja obejmuje wady materiałowe i produkcyjne.'
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, onToggle, index }: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-lg font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
          {question}
        </span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="ml-4 flex-shrink-0"
        >
          {isOpen ? (
            <Minus className="w-6 h-6 text-emerald-500" />
          ) : (
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-emerald-500 transition-colors" />
          )}
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12">
              <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Często zadawane pytania</h2>
          <p className="text-gray-600">
            Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych produktów i procesu zamówienia
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;