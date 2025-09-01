import { BlogPost } from "@/lib/blog/schema";
import { BlogFilterSchema } from "../blog-schema";
import z from "zod";

export interface getBlogsActionResponseSchema {
    posts: BlogPost[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNext: boolean;
        hasPrevious: boolean;
        nextPage: number;
        previousPage: number;
    }
    filters: z.infer<typeof BlogFilterSchema>
}