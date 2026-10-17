import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const fromSrc = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': fromSrc('api'),
      '@components': fromSrc('components'),
      '@constants': fromSrc('constants'),
      '@hooks': fromSrc('hooks'),
      '@models': fromSrc('models'),
      '@store': fromSrc('store'),
      '@utils': fromSrc('utils'),
    },
  },
});
