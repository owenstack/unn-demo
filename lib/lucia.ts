import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { User as DatabaseUser } from "@prisma/client";
import { Lucia } from "lucia";

import prisma from "./db";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			fullName: attributes.fullName,
			roleId: attributes.roleId,
		};
	},
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, "id">;
	}
}
