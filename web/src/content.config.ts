import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const howWeWork = defineCollection({
  loader: glob({ pattern: 'src/content/how-we-work/*.md' }),
  schema: z.object({
    category: z.string(),
    title: z.string(),
    themeColor: z.string(),
    order: z.number().optional(),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: 'src/content/home/*.yaml' }),
  schema: z.object({
    headline: z.string(),
    heroDescription: z.string(),
  }),
});

const footer = defineCollection({
  loader: glob({ pattern: 'src/content/footer/**/*.yaml' }),
  schema: z.object({
    title: z.string(),
    items: z.array(
      z.object({
        label: z.string(),
        href: z.string().optional(),
      })
    ),
    order: z.number().optional(),
  }),
});

const privacy = defineCollection({
  loader: glob({ pattern: 'src/content/privacy/**/*.yaml' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
  }),
});

const philosophy = defineCollection({
  loader: glob({ pattern: 'src/content/philosophy/**/*.yaml' }),
  schema: z.any(),
});

const philosophyHero = defineCollection({
  loader: glob({ pattern: 'src/content/philosophy-hero/**/*.yaml' }),
  schema: z.object({
    headline: z.string(),
    description: z.string(),
  }),
});

const ourWork = defineCollection({
  loader: glob({ pattern: 'src/content/our-work/*.yaml' }),
  schema: z.any(),
});

const news = defineCollection({
  loader: glob({ pattern: 'src/content/news/*.yaml' }),
  schema: z.object({
    headline: z.string(),
    sources: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
      })
    ),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: 'src/content/contact/*.yaml' }),
  schema: z.object({
    headline: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  'how-we-work': howWeWork,
  'home': home,
  'footer': footer,
  'privacy': privacy,
  'philosophy': philosophy,
  'philosophy-hero': philosophyHero,
  'our-work': ourWork,
  'news': news,
  'contact': contact,
};
