import { parse } from 'yaml';
import { z } from 'astro:content';
import profileSource from '../data/profile.yml?raw';
import publicationSource from '../data/publications.yml?raw';
import topicSource from '../data/research_topics.yml?raw';

const profileSchema = z.object({
  name: z.string(), name_zh: z.string().optional(), headline: z.string(), location: z.string(), email: z.string().email(),
  links: z.object({ github: z.string().url(), linkedin: z.string().url(), scholar: z.string().url(), cv: z.string() }),
  about: z.string(),
  highlights: z.array(z.object({ title: z.string(), text: z.string().optional(), items: z.array(z.object({ main: z.string(), subitems: z.array(z.string()) })).optional() })),
  timeline: z.array(z.object({ date: z.string(), text: z.string() })),
  author_highlight: z.array(z.string()),
});
const publicationSchema = z.object({
  id: z.string(), title: z.string(), summary: z.string(), year: z.number(),
  published: z.string().regex(/^\d{4}(-\d{2}-\d{2})?$/), venue: z.string(), authors: z.string(),
  topic: z.enum(['molecules', 'environments', 'entertainment', 'methods', 'explorations']),
  focus: z.string(), status: z.enum(['published', 'preprint', 'accepted']),
  authorship: z.enum(['first', 'co-first', 'co-author']),
  selected: z.boolean().default(false),
  url: z.string().url().optional(), pdf: z.string().url().optional(), code: z.string().url().optional(),
  image: z.object({ src: z.string(), width: z.number(), height: z.number(), alt: z.string(), caption: z.string() }).optional(),
});
export const profile = profileSchema.parse(parse(profileSource));
export const publications = z.array(publicationSchema).parse(parse(publicationSource)).sort((a, b) => b.published.localeCompare(a.published));
export const topics = z.array(z.object({ id: z.enum(['molecules', 'environments', 'entertainment', 'methods', 'explorations']), title: z.string(), kind: z.enum(['application', 'methods', 'supporting']), description: z.string(), empty_message: z.string().optional() })).parse(parse(topicSource));
export type Publication = z.infer<typeof publicationSchema>;
export const site = {
  name: profile.name,
  description: 'Zhuoyang Jiang — AI and HCI for creativity and design, across the physical sciences, built environments, and entertainment.',
};
export const navigation = [
  { title: 'About', url: '/' },
  { title: 'Research', url: '/publications/' },
  { title: 'Projects', url: '/projects/' },
  { title: 'Blog', url: '/blog/' },
];
