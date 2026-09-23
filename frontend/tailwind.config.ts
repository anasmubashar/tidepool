import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#fbf9f5',
          dark: '#f5f3ef',
          chip: '#efeeea',
          chipHover: '#eae8e4',
          subtle: '#f2f0ec',
        },
        ink: {
          DEFAULT: '#1b1c1a',
          muted: '#615e59',
          faint: '#8c857b',
          subtle: '#5d564e',
          brown: '#57423b',
        },
        terracotta: {
          DEFAULT: '#b8502a',
          dark: '#983914',
          light: '#fff2ee',
          tint: '#ddc0b7',
          hover: '#a34421',
          border: 'rgba(184, 80, 42, 0.2)',
        },
        border: {
          light: '#eae8e4',
          DEFAULT: '#ded9ce',
          medium: '#d3dbd8',
          strong: '#b8b2a5',
        },
      },
      fontFamily: {
        serif: ['var(--font-newsreader)', 'Liberation Serif', 'Georgia', 'serif'],
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        card: '0px 1px 3px rgba(0, 0, 0, 0.05)',
        letterpress: 'inset 0 1px 2px rgba(0, 0, 0, 0.06)',
        dropdown: '0 8px 24px -4px rgba(27, 28, 26, 0.08), 0 2px 6px -1px rgba(27, 28, 26, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
