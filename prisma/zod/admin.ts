import * as z from "zod";
import {
	type CompleteRole,
	type CompleteSession,
	relatedRoleModel,
	relatedSessionModel,
} from "./index";

export const adminModel = z.object({
	id: z.string(),
	email: z.string(),
	fullName: z.string(),
	hashedPassword: z.string(),
	roleId: z.number().int(),
});

export interface CompleteAdmin extends z.infer<typeof adminModel> {
	sessions: CompleteSession[];
	role: CompleteRole;
}

/**
 * relatedAdminModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdminModel: z.ZodSchema<CompleteAdmin> = z.lazy(() =>
	adminModel.extend({
		sessions: relatedSessionModel.array(),
		role: relatedRoleModel,
	}),
);
