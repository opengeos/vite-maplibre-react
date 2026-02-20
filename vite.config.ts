import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path configuration:
  // - GitHub Actions: '/vite-maplibre-react/' for GitHub Pages
  // - Local: './' for relative paths (allows opening dist/index.html directly)
  base: process.env.GITHUB_ACTIONS ? '/vite-maplibre-react/' : './',
});
