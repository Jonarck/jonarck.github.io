import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jonarck.github.io',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: page => !page.endsWith('/404/') }), tailwind()],
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
  redirects: { '/about/': '/', '/cv/': '/' },
  devToolbar: { enabled: false },
});
