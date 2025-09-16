import { getApi, postApi } from "@/schemas/api-schema"
import axios from "axios"

export const enrollCourseService = async (body: { courseId: string }) => {
    try {
        const url = `/api/academy/course`
        return await postApi(url, body, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const markLessonCompletedService = async (body: { courseId: string, lessonId: string }) => {
    try {
        const url = `/api/academy/course/mark-lesson-completed`
        return await postApi(url, body, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const saveQuizResultService = async (body: { courseId: string, quizId: string, answers: { questionId: string, answer: string }[] }) => {
    try {
        const url = `/api/academy/course/save-quiz-result`
        return await postApi(url, body, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const getUserCoursesService = async () => {
    try {
        const url = `/api/academy/course/user-courses`
        return await getApi(url, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const getAllCoursesService = async () => {
    try {
        const url = `/api/academy/courses`
        return await getApi(url, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}

export const getCourseBySlugService = async (slug: string) => {
    try {
        const url = `/api/academy/courses/${slug}`
        return await getApi(url, true)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
            return error.response.data
        }
    }
}