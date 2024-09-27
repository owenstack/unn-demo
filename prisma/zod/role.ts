import * as z from "zod"
import { CompleteAdmins, relatedAdminsModel } from "./index"

export const roleModel = z.object({
  id: z.string(),
  role: z.string(),
  isAdmin: z.boolean(),
  isDean: z.boolean(),
  isSupervisor: z.boolean(),
})

export interface CompleteRole extends z.infer<typeof roleModel> {
  admins: CompleteAdmins[]
}

/**
 * relatedRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedRoleModel: z.ZodSchema<CompleteRole> = z.lazy(() => roleModel.extend({
  admins: relatedAdminsModel.array(),
}))
