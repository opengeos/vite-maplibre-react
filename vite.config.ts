import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  // Uses repository name as base path in CI, root for local development
  base: process.env.GITHUB_ACTIONS ? '/vite-maplibre-react/' : '/',
});
