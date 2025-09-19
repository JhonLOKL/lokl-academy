export interface Webinar{
    id: string;     
    title: string;
    description: string;
    scheduledAt: string;
    accessLink?: string;
    coverImageUrl?: string;
    canEnroll: boolean;
}
