import * as z from "zod"
import { CompleteRole, relatedRoleModel } from "./index"

export const adminsModel = z.object({
  id: z.string(),
  username: z.string(),
  roleId: z.string(),
})

export interface CompleteAdmins extends z.infer<typeof adminsModel> {
  role: CompleteRole
}

/**
 * relatedAdminsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdminsModel: z.ZodSchema<CompleteAdmins> = z.lazy(() => adminsModel.extend({
  role: relatedRoleModel,
}))
