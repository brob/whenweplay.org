// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://whenweplay.org',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sanity({
    projectId: "4v8ldsm8",
    dataset: "production",
    useCdn: false, // for static builds
  }), sitemap({
    
  })]
});