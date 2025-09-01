import { z } from 'zod';


export const BlogFilterSchema = z.object({
    search: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.string().optional(),
    includeAuthor: z.boolean().optional()
});

