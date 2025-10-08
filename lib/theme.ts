// UsITech Design System Constants

export const colors = {
  primary: '#002B6B',
  accent: '#007BFF',
  background: '#F8FAFC',
  text: {
    primary: '#0F172A',
    secondary: '#334155'
  }
} as const;

export const spacing = {
  section: 'py-16 md:py-20',
  container: 'mx-auto max-w-6xl px-4 md:px-6'
} as const;

export const typography = {
  heading: 'font-bold text-3xl md:text-4xl',
  subheading: 'text-gray-600 text-lg md:text-xl',
  body: 'text-gray-700 leading-relaxed'
} as const;

export const components = {
  button: {
    primary: 'bg-gradient-to-r from-[#002B6B] to-[#007BFF] hover:brightness-110 text-white font-semibold rounded-xl shadow-md transition-all duration-200',
    secondary: 'border-[#007BFF] text-[#002B6B] hover:bg-[#EAF2FF] border-2 font-semibold rounded-xl transition-all duration-200'
  },
  card: 'rounded-2xl border border-gray-200 bg-white shadow-sm',
  focus: 'focus-visible:ring-2 focus-visible:ring-[#007BFF] focus-visible:ring-offset-2'
} as const;
