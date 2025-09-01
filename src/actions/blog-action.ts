import { getBlogsActionResponseSchema } from "@/schemas/action-schemas";
import { BlogFilterSchema } from "@/schemas/blog-schema";
import { getBlogsService } from "@/services/blog-service";
import { z } from "zod";


const defaultResponse: getBlogsActionResponseSchema = {
    posts: [],
    pagination: {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 0,
        hasNext: false,
        hasPrevious: false,
        nextPage: 0,
        previousPage: 0,
    },
    filters: BlogFilterSchema.parse({})
}


export const getWithdrawalsAction = async (body: z.infer<typeof BlogFilterSchema>): Promise<getBlogsActionResponseSchema> => {

    try {
        const resp = await getBlogsService(body)
        if (resp && resp.success) {
            return { ...resp.data };
        }
        else return defaultResponse
    } catch (error) {
        throw error
    }
}
