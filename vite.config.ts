import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const pages = [
  'index.html',
  'about/index.html',
  'projects/index.html',
  'projects/snapsort/index.html',
  'projects/compliance-guardian/index.html',
  'projects/xuanlan/index.html',
  'projects/aoda/index.html',
  'contact/index.html',
];

export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input: pages.map((page) => resolve(__dirname, page)) } },
  server: { host: '127.0.0.1', port: 4318, strictPort: true },
  preview: { host: '127.0.0.1', port: 4318, strictPort: true },
});