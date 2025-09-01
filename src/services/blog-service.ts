import { getApi } from "@/schemas/api-schema"
import { BlogFilterSchema } from "@/schemas/blog-schema"
import { BlogLiteFilterSchema } from "@/schemas/blog-lite"
import { getBlogsServiceResponseSchema } from "@/schemas/service-schemas/blog-service-shema"
import axios from "axios"
import { z } from "zod"

export const getBlogsService = async (body: z.infer<typeof BlogFilterSchema>): Promise<getBlogsServiceResponseSchema | undefined> => {
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

// Servicio para la API lite con paginación y filtros SEO
export const getBlogsLiteService = async (body: z.infer<typeof BlogLiteFilterSchema>) => {
    try {
        const params = new URLSearchParams()
        if (body.search) params.append('search', body.search)
        if (body.tags && body.tags.length) params.append('tags', body.tags.join(','))
        if (body.category) params.append('category', body.category)
        if (body.status) params.append('status', body.status)
        if (typeof body.page !== 'undefined') params.append('page', String(body.page))
        if (typeof body.limit !== 'undefined') params.append('limit', String(body.limit))
        if (typeof body.featured !== 'undefined') params.append('featured', String(body.featured))
        if (body.sortBy) params.append('sortBy', body.sortBy)
        if (body.sortOrder) params.append('sortOrder', body.sortOrder)
        if (typeof body.includeAuthor !== 'undefined') params.append('includeAuthor', String(body.includeAuthor))

        const url = `/api/academy/blog/lite${params.toString() ? `?${params.toString()}` : ''}`
        return await getApi(url)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return error.response.data
        }
    }
}

export const getBlogBySlugService = async (slug: string) => {
    try {
        const url = `/api/academy/blog/${encodeURIComponent(slug)}`
        return await getApi(url)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const getRelatedBlogsService = async (id: string, limit?: number) => {
    try {
        const url = `/api/academy/blog/${encodeURIComponent(id)}/related${typeof limit === 'number' ? `?limit=${limit}` : ''}`
        return await getApi(url)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

