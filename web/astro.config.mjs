// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sam-lee-home.github.io',
  base: '/Sam-Lee-Home',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
