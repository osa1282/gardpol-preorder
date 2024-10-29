import { motion } from 'framer-motion';
import { ShoppingCart, Timer, Package, Warehouse, Truck } from 'lucide-react';
import StepCard from '../components/StepCard';

const steps = [
  {
    icon: ShoppingCart,
    title: 'Złożenie zamówienia',
    description: 'Wybierz produkty i złóż zamówienie online',
    color: 'emerald',
    duration: 'Dzień 1'
  },
  {
    icon: Timer,
    title: 'Przekazanie do produkcji',
    description: 'Rozpoczynamy proces produkcyjny',
    color: 'blue',
    duration: 'Dni 2-45'
  },
  {
    icon: Package,
    title: 'Pakowanie zamówienia',
    description: 'Starannie pakujemy Twoje produkty',
    color: 'indigo',
    duration: 'Dni 46-60'
  },
  {
    icon: Warehouse,
    title: 'Wysyłka do magazynu',
    description: 'Transport do centrum logistycznego',
    color: 'purple',
    duration: 'Dni 61-75'
  },
  {
    icon: Truck,
    title: 'Dostawa towaru',
    description: 'Dostarczamy zamówienie pod wskazany adres',
    color: 'violet',
    duration: 'Dni 76-90'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Jak to działa</h2>
          <p className="text-gray-600">Proces realizacji zamówienia trwa od 75 do 90 dni roboczych</p>
        </motion.div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Progress Line Background */}
          <div className="absolute hidden lg:block left-0 right-0 top-[48px] h-0.5 bg-gray-200" />
          
          {/* Animated Progress Line */}
          <motion.div
            className="absolute hidden lg:block left-0 right-0 top-[48px] h-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 via-indigo-500 via-purple-500 to-violet-500"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {/* Loading Pulse Effect */}
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{
                x: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <StepCard {...step} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;