import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://punto-saas.github.io/puntosaas-astro-landing/", // Update to your GitHub Pages URL
  base: "/puntosaas-astro-landing/", // Set base path for GitHub Pages
  integrations: [mdx(), sitemap(), icon(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});