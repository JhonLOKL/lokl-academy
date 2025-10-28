import { z } from "zod";

// Schema para los datos de entrada de la simulación
export const SimulationInputSchema = z.object({
  installmentsNumber: z.number().int().positive(),
  investmentValue: z.number().positive(),
  projectId: z.string().uuid(),
});

export type SimulationInput = z.infer<typeof SimulationInputSchema>;

// Schema para los datos de la simulación retornados por la API
export const SimulationDataSchema = z.object({
  unitValue: z.number(),
  unitsAmount: z.number(),
  totalIncome: z.number(),
  totalValuation: z.number(),
  averageRate: z.number(),
  accommodations: z.number(),
  occupation: z.number(),
  costMargin: z.number(),
  estimatedParticipation: z.number(),
  financingFee: z.number(),
  installmentValue: z.number(),
  totalToPay: z.number(),
  investmentValue: z.number(),
  percentageValorizationYears: z.array(z.number()),
  porcentageIncomeYears: z.array(z.number()),
  averageAnnualReturnYears: z.array(z.number()),
});

export type SimulationData = z.infer<typeof SimulationDataSchema>;

// Schema para la respuesta de la API
export const SimulationApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: SimulationDataSchema,
});

export type SimulationApiResponse = z.infer<typeof SimulationApiResponseSchema>;

// Schema para la respuesta del servicio/action
export const SimulationResponseSchema = z.object({
  success: z.boolean(),
  data: SimulationDataSchema.nullable(),
  error: z.string().optional(),
});

export type SimulationResponse = z.infer<typeof SimulationResponseSchema>;

