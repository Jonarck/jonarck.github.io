import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const common = {
  title: z.string(), description: z.string(), date: z.coerce.date(),
  draft: z.boolean().default(false), tags: z.array(z.string()).default([]),
  lang: z.string().default('en'),
  image: z.string().optional(), image_alt: z.string().optional(), image_caption: z.string().optional(),
};
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({ ...common, updated: z.coerce.date().optional(),
    alternate_title: z.string().optional(), date_label: z.string().optional(),
    series: z.string().optional(), series_en: z.string().optional(),
    series_id: z.string().regex(/^[a-z0-9-]+$/).optional(), series_order: z.number().optional(),
    translation_key: z.string().optional(), translation_of: z.string().optional(),
    image_cover: z.boolean().default(true),
  }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({ ...common, role: z.string().optional(), venue: z.string().optional(),
    featured: z.boolean().default(false),
    code: z.string().url().optional(), demo: z.string().url().optional(), paper: z.string().url().optional(),
  }),
});
export const collections = { blog, projects };
