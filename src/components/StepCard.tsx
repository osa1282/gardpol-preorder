import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  duration: string;
  index: number;
}

const StepCard = ({ icon: Icon, title, description, color, duration, index }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <motion.div
        className="flex flex-col items-center group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className={`w-24 h-24 rounded-full bg-${color}-100 flex items-center justify-center mb-6 relative overflow-hidden
            shadow-lg shadow-${color}-100/50 group-hover:shadow-${color}-200/50 transition-shadow duration-300
            border-4 border-white`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Animated background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r from-${color}-100 via-${color}-50 to-${color}-100`}
            animate={{
              x: ["0%", "100%", "0%"],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
          
          {/* Rotating shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
          />
          
          <Icon className={`w-12 h-12 text-${color}-500 relative z-10 group-hover:scale-110 transition-transform duration-300`} />
        </motion.div>
        
        <motion.div
          className="text-center"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          <span className="text-sm font-medium text-gray-500">{duration}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StepCard;