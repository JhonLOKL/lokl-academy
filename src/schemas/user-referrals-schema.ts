import { z } from "zod";

export const ReferralInvestmentSchema = z.object({
  projectName: z.string(),
  investedAt: z.string(),
  contributionAmount: z.number(),
  transactionDate: z.string(),
});

export const ReferralUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.string(),
  status: z.enum(["referred", "invested"]),
  investments: z.array(ReferralInvestmentSchema),
});

export const UserReferralsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(ReferralUserSchema),
});

export type ReferralInvestment = z.infer<typeof ReferralInvestmentSchema>;
export type ReferralUser = z.infer<typeof ReferralUserSchema>;
export type UserReferralsResponse = z.infer<typeof UserReferralsResponseSchema>;
