import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Award, Clock, Headphones, Leaf } from 'lucide-react';

const reasons = [
  { title: 'Przedsprzedaż', description: 'Jako jedyni na rynku wporwadziliśmy możliwość przedsprzedaży poza sezonem letnim', icon: TrendingUp },
  { title: 'Jakość', description: 'Kupujesz sprawdzony produkt polecany również do użyteczności publicznej, jakość jest gwarantowana', icon: Award },
  { title: 'Doświadczenie', description: 'Od ponad 10 lat zajmujemy się sprzedażą i montażem tarasów kompozytowych', icon: Clock },
  { title: 'Wsparcie', description: 'Nie jesteś pewien ile towaru potrzebujesz zamówić? Nasi handlowcy pomogą Ci w tym!', icon: Headphones },
  { title: 'Ekologia', description: 'Nasze produkty posiadają certyfikat FSC który zapewnia klientów że produkty są produkowane zgodnie z najwyższymi standardami środowiskowymi', icon: Leaf },
];

const WhyChooseUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setActiveIndex(0);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && activeIndex >= 0 && activeIndex < reasons.length - 1) {
      const timer = setTimeout(() => {
        setActiveIndex(activeIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, activeIndex]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-24 text-gray-800">
          Dlaczego nas <span className="text-[#07bc0c]">wybrać?</span>
        </h2>
        <div className="relative">
          <div className="flex justify-between relative z-10 mb-8">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col items-center w-1/5">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg 
                    ${isVisible && index <= activeIndex
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-white text-gray-400'
                    } 
                    hover:bg-white hover:text-[#16A34A] hover:shadow-xl group`}
                >
                  {React.createElement(reason.icon, { 
                    size: 32, 
                    className: "transition-all duration-300 group-hover:scale-110" 
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute left-0 right-0 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#07bc0c] transition-all duration-1000 ease-out rounded-full"
              style={{ width: isVisible ? `${((activeIndex + 1) / reasons.length) * 100}%` : '0%' }}
            ></div>
          </div>
          <div className="flex justify-between relative z-10 pt-12">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col items-center w-1/5">
                <div
                  className={`text-center transition-all duration-500 ${
                    isVisible && index <= activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <h3 className="font-bold text-xl mb-2 text-gray-800">
                    {reason.title}
                  </h3>
                  <div className="relative overflow-hidden rounded-lg">
                    <p className="text-sm text-gray-600 max-w-[200px] mx-auto leading-relaxed p-4 transition-all duration-300 hover:text-white hover:bg-[#16A34A]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;