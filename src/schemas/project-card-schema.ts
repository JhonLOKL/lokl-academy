import { z } from "zod";

export const ProjectCardSchema = z.object({
  id: z.string().uuid(),
  projectCode: z.string(),
  unitPrice: z.number(),
  description: z.string(),
  subscriptionFeePercentage: z.number(),
  maxInvestmentQuota: z.number(),
  endDate: z.string().nullable(),
  name: z.string(),
  country: z.string(),
  city: z.string(),
  squareMeters: z.number(),
  minInvestmentUnits: z.number(),
  partners: z.number(),
  phase: z.string(),
  accommodations: z.number(),
  minRent: z.number(),
  maxRent: z.number(),
  amenities: z.array(z.string()),
  availableSpots: z.number().nullable(),
  totalSpots: z.number().nullable(),
  videoURL: z.string().nullable(),
  imageURL: z.string(),
});

export type ProjectCard = z.infer<typeof ProjectCardSchema>;

export const ProjectCardsArraySchema = z.array(ProjectCardSchema);

export type ProjectCardsResponse = {
  success: boolean;
  projects: ProjectCard[];
  error?: string;
};

