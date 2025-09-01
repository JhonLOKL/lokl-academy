import { getApi } from "@/schemas/api-shema"
import { getBlogsServiceResponseSchema } from "@/schemas/service-schemas/blog-service-shema"
import axios from "axios"

export const getBlogsService = async (body: { search?: string, tags?: string[], featured?: boolean, sortBy?: string, sortOrder?: string, includeAuthor?: boolean }): Promise<getBlogsServiceResponseSchema | undefined> => {
    try {
        const params = new URLSearchParams()

        if (body.search) params.append('search', body.search.toString())
        if (body.tags) params.append('tags', body.tags.toString())
        if (body.featured) params.append('featured', body.featured.toString())
        if (body.sortBy) params.append('sortBy', body.sortBy.toString())
        if (body.sortOrder) params.append('sortOrder', body.sortOrder.toString())
        if (body.includeAuthor) params.append('includeAuthor', body.includeAuthor.toString())

        const queryString = params.toString()
        const url = `/api/academy/blog${queryString ? '?' + queryString : ''}`

        return await getApi(url)
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return error.response.data
        }
    }
}