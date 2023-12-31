import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'savoy-blue': '#5F6CB0',
        'indian-red': '#E3585D',
        'sandy-brown': '#FFB677',
        'coral': '#FF8465',
        'ultra-violet': '#545196',
        'purple': '#4D3D89',
        'deep-purple': '#46297B',
        'neon-blue': '#5B68F1',
        'jet': '#2B2D31',
        'gunmetal': '#303440',
        'eerie-black': '#1E1F22',
        'imperial-red': '#F23F43',
        'xanthous': '#F0B232',
        'pigment-green': '#23A55A'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
export default config
