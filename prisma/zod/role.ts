import * as z from "zod";
import { type CompleteUser, relatedUserModel } from "./index";

export const roleModel = z.object({
	id: z.number().int(),
	role: z.string(),
});

export interface CompleteRole extends z.infer<typeof roleModel> {
	Users: CompleteUser[];
}

/**
 * relatedRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedRoleModel: z.ZodSchema<CompleteRole> = z.lazy(() =>
	roleModel.extend({
		Users: relatedUserModel.array(),
	}),
);
