import { upsertLeadService } from "@/services/user-service";
import { sendAldeaMessageService, WhatsAppAldeaMessageInput, enrollLeadService, EnrollLeadInput } from "@/services/aldea-service";

export interface AldeaLeadData {
    email: string;
    firstName: string;
    lastName?: string;
    phone: string;
    leadOrigin?: string;
    origin?: string;
    project?: string;
    status?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
}

export const upsertAldeaLeadAction = async (leadData: AldeaLeadData) => {
    try {
        const response = await upsertLeadService({
            email: leadData.email,
            firstName: leadData.firstName,
            lastName: leadData.lastName,
            phone: leadData.phone,
            leadOrigin: leadData.leadOrigin,
            origin: leadData.origin,
            project: leadData.project,
            status: leadData.status,
            utmSource: leadData.utmSource,
            utmMedium: leadData.utmMedium,
            utmCampaign: leadData.utmCampaign,
            utmTerm: leadData.utmTerm,
            utmContent: leadData.utmContent,
        });
        return response;
    } catch (error) {
        console.error("Error al crear/actualizar el lead de Aldea:", error);
        return {
            success: false,
            message: "Error al crear/actualizar el lead de Aldea",
        };
    }
};

export const sendAldeaMessageAction = async (input: WhatsAppAldeaMessageInput) => {
    try {
        // Verificar si ya se contactó al lead en las últimas 24 horas
        const lastContact = typeof window !== 'undefined'
            ? localStorage.getItem("lastContactByLauraAldea")
            : null;

        if (lastContact) {
            const lastContactDate = new Date(lastContact);
            const now = new Date();
            const hoursDiff = (now.getTime() - lastContactDate.getTime()) / (1000 * 60 * 60);

            if (hoursDiff < 24) {
                return {
                    success: true,
                    skipped: true,
                    message: `Ya se contactó a esta persona recientemente.`,
                };
            }
        }

        const response = await sendAldeaMessageService(input);

        if (response.success && typeof window !== 'undefined') {
            const now = new Date();
            localStorage.setItem("lastContactByLauraAldea", now.toISOString());
        }

        return response;
    } catch (error) {
        console.error("Error al enviar el mensaje de WhatsApp de Aldea:", error);
        return {
            success: false,
            message: "Error al enviar el mensaje de WhatsApp de Aldea",
            skipped: false,
        };
    }
};

export const enrollLeadAction = async (input: EnrollLeadInput) => {
    try {
        const response = await enrollLeadService(input);
        return response;
    } catch (error) {
        console.error("Error en enrollLeadAction:", error);
        return {
            success: false,
            message: "Error al inscribir el lead",
        };
    }
};
