import { defineCollection, z } from 'astro:content';

const ourWork = defineCollection({
  type: 'data',
  schema: z.union([
    // Schema for the main body entry (an array of cards)
    z.array(
      z.object({
        category: z.string().optional(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        order: z.number().optional(),
      })
    ),
    // Schema for the hero entries
    z.object({
      headline: z.string(),
      description: z.string(),
    }),
  ]),
});

export const collections = {
  'our-work': ourWork,
};