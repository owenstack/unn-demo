import * as z from "zod";
import {
	type CompleteRole,
	type CompleteSession,
	relatedRoleModel,
	relatedSessionModel,
} from "./index";

export const adminsModel = z.object({
	id: z.string(),
	email: z.string(),
	fullName: z.string(),
	hashedPassword: z.string(),
	roleId: z.number().int(),
});

export interface CompleteAdmins extends z.infer<typeof adminsModel> {
	sessions: CompleteSession[];
	role: CompleteRole;
}

/**
 * relatedAdminsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdminsModel: z.ZodSchema<CompleteAdmins> = z.lazy(() =>
	adminsModel.extend({
		sessions: relatedSessionModel.array(),
		role: relatedRoleModel,
	}),
);
