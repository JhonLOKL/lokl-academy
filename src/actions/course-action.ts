import { Course } from "@/lib/course/schema"
import { enrollCourseService, getAllCoursesService, getCourseBySlugService, getUserCoursesService, markLessonCompletedService, saveQuizResultService } from "@/services/course-service"

// Función auxiliar para normalizar datos del curso (corrige typos del backend)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeCourseData = (course: any): Course => {
    if (!course) return course;
    
    // Corregir typo 'princing' -> 'pricing'
    // Verificamos explícitamente ambas propiedades
    const pricingData = course.pricing || course.princing;
    
    if (pricingData) {
        course.pricing = pricingData;
    }
    
    // Asegurar que accessRequirements exista
    if (!course.accessRequirements) {
        course.accessRequirements = {
            plan: 'basic',
            minimumLevel: 'any'
        };
    }

    return course as Course;
};

export const enrollCourseAction = async (body: { courseId: string }) : Promise<{ success: boolean, message: string, error?: string }> => {
    try {
        const response = await enrollCourseService(body)
        if (response && response?.success) {
            return {
                success: true,
                message: "Curso inscrito correctamente"
            }
        }
        return response
    } catch (error) {
        console.error("Error al inscribir al curso", error)
        return {
            success: false,
            message: "Error al inscribir al curso.",
            error: "Error al inscribir al curso."
        }
    }
}

export const markLessonCompletedAction = async (body: { courseId: string, lessonId: string }) : Promise<{ 
    success: boolean,
    message: string,
    error?: string,
    data?: {
        attempt: {
            id: string,
            quizId: string,
            isCompleted: boolean,
            passed: boolean,
            completedAt: string,
            score: number,
            answers: {
                id: string,
                questionId: string,
                answer: string,
                points: number,
                isCorrect: boolean
            }[]
        }
    }

 }> => {
    try {
        const response = await markLessonCompletedService(body)
        if (response && response?.success) {
            return {
                success: true,
                message: "Clase completada correctamente",
                data: response.data
            }
        }
        return response
    } catch (error) {
        console.error("Error al completar la clase.", error)
        return {
            success: false,
            message: "Error al completar la clase.",
            error: "Error al completar la clase."
        }
    }
}

export const saveQuizResultAction = async (body: { courseId: string, quizId: string, answers: { questionId: string, answer: string }[] }) : Promise<{ success: boolean, message: string, error?: string }> => {
    try {
        const response = await saveQuizResultService(body)
        if (response && response?.success) {
            return {
                success: true,
                message: "Resultado del cuestionario guardado correctamente"
            }
        }
        return response
    } catch (error) {
        console.error("Error al guardar el resultado del cuestionario.", error)
        return {
            success: false,
            message: "Error al guardar el resultado del cuestionario.",
            error: "Error al guardar el resultado del cuestionario."
        }
    }
}

export const getUserCoursesAction = async () : Promise<{ success: boolean,  data?: Course[], error?: string }> => {
    try {
        const response = await getUserCoursesService()
        if (!response?.success) {
            return {
                success: false,
                error: response.message,
                data: []
            }
        }
        
        // Normalizar cursos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const normalizedCourses = (response.data || []).map((c: any) => normalizeCourseData(c));
        
        return {
            ...response,
            data: normalizedCourses
        }
    } catch (error) {
        console.error("Error al obtener los cursos del usuario.", error)
        return {
            success: false,
            error: "Error al obtener los cursos del usuario.",
            data: []
        }
    }
}

export const getAllCoursesAction = async () : Promise<{ success: boolean,  data?: Course[], error?: string }> => {
    try {
        const response = await getAllCoursesService()
        if (!response?.success) {
            return {
                success: false,
                error: response.message,
                data: []
            }
        }
        
        // Normalizar cursos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const normalizedCourses = (response.data || []).map((c: any) => normalizeCourseData(c));

        return {
            ...response,
            data: normalizedCourses
        }
    } catch (error) {
        console.error("Error al obtener los cursos del usuario.", error)
        return {
            success: false,
            error: "Error al obtener los cursos del usuario.",
            data: []
        }
    }
}

export const getCourseBySlugAction = async (slug: string) : Promise<{ success: boolean,  data?: {course: Course | null, isEnrolled: boolean}, error?: string }> => {
    try {
        const response = await getCourseBySlugService(slug)
        if (!response?.success) {
            return {
                success: false,
                error: response.message,
                data: {
                    course: null,
                    isEnrolled: false
                }
            }
        }

        // Normalizar curso individual
        if (response.data?.course) {
            response.data.course = normalizeCourseData(response.data.course);
        }

        return response
    } catch (error) {
        console.error("Error al obtener el curso. Intenlo mas tarde.", error)
        return {
            success: false,
            error: "Error al obtener el curso. Intenlo mas tarde.",
            data: {
                course: null,
                isEnrolled: false
            }
        }
    }
}
