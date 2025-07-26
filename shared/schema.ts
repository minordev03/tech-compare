import { z } from "zod";

// Comparison data structure
export const comparisonSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  categoryPath: z.string(), // e.g., "Consumer Electronics > Smartphones"
  introduction: z.string(),
  items: z.array(z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().optional(),
    specs: z.record(z.string(), z.any())
  })),
  comparisonTable: z.array(z.object({
    feature: z.string(),
    values: z.record(z.string(), z.string()) // itemName -> value
  })),
  seoMetadata: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.array(z.string())
  }),
  media: z.object({
    images: z.array(z.string()),
    videos: z.array(z.string())
  }).optional(),
  disclaimer: z.string().optional(),
  updatedAt: z.string(),
  featured: z.boolean().default(false)
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  path: z.string(),
  comparisonCount: z.number()
});

export const searchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  relevance: z.number()
});

export type Comparison = z.infer<typeof comparisonSchema>;
export type Category = z.infer<typeof categorySchema>;
export type SearchResult = z.infer<typeof searchResultSchema>;
