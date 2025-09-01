import { BlogPost } from "@/lib/blog/schema";

export interface getBlogsServiceResponseSchema {
    success: boolean;
    message: string;
    data: {
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
        filters: {
            search: string;
            category: string;
            tags: string[];
            featured: boolean;
            sortBy: string;
            sortOrder: string;
        }
    }
}