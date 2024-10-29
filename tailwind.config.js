export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-emerald-100',
    'text-emerald-500',
    'from-emerald-500',
    'shadow-emerald-100/50',
    'shadow-emerald-200/50',
    'bg-emerald-50',
    
    'bg-blue-100',
    'text-blue-500',
    'from-blue-500',
    'shadow-blue-100/50',
    'shadow-blue-200/50',
    'bg-blue-50',
    
    'bg-indigo-100',
    'text-indigo-500',
    'from-indigo-500',
    'shadow-indigo-100/50',
    'shadow-indigo-200/50',
    'bg-indigo-50',
    
    'bg-purple-100',
    'text-purple-500',
    'from-purple-500',
    'shadow-purple-100/50',
    'shadow-purple-200/50',
    'bg-purple-50',
    
    'bg-violet-100',
    'text-violet-500',
    'from-violet-500',
    'shadow-violet-100/50',
    'shadow-violet-200/50',
    'bg-violet-50',
  ],
};