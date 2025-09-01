import { z } from "zod";

export const BlogLiteFilterSchema = z.object({
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  featured: z.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  includeAuthor: z.boolean().optional(),
});

export type BlogLiteFilters = z.infer<typeof BlogLiteFilterSchema>;


