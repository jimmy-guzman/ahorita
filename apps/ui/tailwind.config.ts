import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['dark'],
    prefix: 'dsy-',
    logs: false,
  },
  plugins: [typography, daisyui],
} satisfies Config;
