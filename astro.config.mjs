import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [react(), keystatic()],
  vite: {
    optimizeDeps: {
      exclude: ['@keystatic/astro'],
    },
  },
});
