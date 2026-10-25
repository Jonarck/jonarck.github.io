import rss from '@astrojs/rss';
import { primaryPosts, entryUrl } from '../lib/content';
import { site } from '../lib/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await primaryPosts();
  return rss({
    title: `${site.name} — Blog`,
    description: 'Essays on places, stories, research, and design. Chinese originals with English translations.',
    site: context.site!,
    items: posts.map(entry => ({ title: entry.data.title, description: entry.data.description, pubDate: entry.data.date, categories: entry.data.tags, link: entryUrl(entry) })),
    customData: '<language>zh-CN</language>',
  });
}
