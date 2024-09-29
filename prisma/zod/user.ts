import * as z from "zod"
import { CompleteSession, relatedSessionModel, CompleteRole, relatedRoleModel } from "./index"

export const userModel = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  hashedPassword: z.string(),
  roleId: z.number().int(),
})

export interface CompleteUser extends z.infer<typeof userModel> {
  sessions: CompleteSession[]
  role: CompleteRole
}

/**
 * relatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => userModel.extend({
  sessions: relatedSessionModel.array(),
  role: relatedRoleModel,
}))
