import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['dark'],
    prefix: 'daisy-',
    logs: false,
  },
  plugins: [typography, daisyui],
} satisfies Config;
