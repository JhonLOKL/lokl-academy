import { enrollPageService, getEnrollPageService, updateEnrollPageService, sendRewardWebhook } from "@/services/EnrollPageService"

export const enrollPageAction = async (body: {
    name: string
    notes: Record<string, unknown>
}): Promise<{ success: boolean, message: string, error?: string }> => {
    try {
        const response = await enrollPageService(body)
        if (!response?.success) {
            return {
                success: false,
                message: response.message || "Error al inscribirse en la página",
                error: response.message || "Error al inscribirse en la página",
            }
        }
        return {
            success: true,
            message: response.message || "Inscripción realizada correctamente",
            error: undefined,
        }
    } catch (error) {
        console.error("Error al inscribirse en la página, intente mas tarde.", error)
        return {
            success: false,
            message: "Error al inscribirse en la página, intente mas tarde.",
            error: "Error al inscribirse en la página, intente mas tarde."
        }
    }
}

export const claimRewardAction = async (rewardDay: number, rewardData: Record<string, unknown>, userId: string, email?: string): Promise<{ success: boolean, message: string }> => {
    try {
        // 1. Obtener inscripción existente
        const existingEnrollment = await getEnrollPageService();

        // 2. Si existe, verificar y actualizar
        if (existingEnrollment && existingEnrollment.success && existingEnrollment.data) {
            const currentNotes = existingEnrollment.data.notes || {};
            const claimedRewards = currentNotes.claimedRewards || [];

            // Si ya reclamó este día, no hacer nada
            if (claimedRewards.includes(rewardDay)) {
                return { success: true, message: "Recompensa ya reclamada anteriormente" };
            }

            // Si no, agregar al array y actualizar
            const updatedNotes = {
                ...currentNotes,
                claimedRewards: [...claimedRewards, rewardDay],
                [`reward_day_${rewardDay}`]: rewardData // Guardar info específica del reward si se desea
            };

            await updateEnrollPageService({ notes: updatedNotes });
            
            // Enviar webhook
            if (userId) {
                await sendRewardWebhook({
                    userId: userId,
                    day: rewardDay,
                    email: email
                });
            }

            return { success: true, message: "Recompensa reclamada exitosamente" };
        }

        // 3. Si no existe (o error al obtener), crear nueva inscripción
        // Nota: Asumimos que si get falla o no trae data, es porque no está inscrito en esta "página" (Advent Calendar)
        const initialNotes = {
            claimedRewards: [rewardDay],
            [`reward_day_${rewardDay}`]: rewardData
        };

        await enrollPageService({
            name: "Advent Calendar",
            notes: initialNotes
        });

        // Enviar webhook
        if (userId) {
            await sendRewardWebhook({
                userId: userId,
                day: rewardDay,
                email: email
            });
        }

        return { success: true, message: "Primera recompensa reclamada exitosamente" };

    } catch (error) {
        console.error("Error claiming reward:", error);
        return { success: false, message: "Error al reclamar la recompensa" };
    }
}

