import * as z from "zod"

export const studentModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  RRR: z.string(),
  invoiceId: z.string(),
  paidAt: z.date(),
})
