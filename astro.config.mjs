import { defineConfig } from 'astro/config';

// Published on GitHub Pages for now, under the repository's name. With a domain of its own, set `site` to it and drop
// `base` (and the noindex line in src/pages/index.astro).
export default defineConfig({
  site: 'https://ivolarys.github.io',
  base: '/cutout-public-web',
});
