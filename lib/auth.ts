import { cache } from "react";
import { cookies } from "next/headers";
import { validateSessionToken, type SessionValidationResult } from "./session";

export const getAuth = cache(async (): Promise<SessionValidationResult> => {
	const sessionCookie = cookies().get("session");
	if (!sessionCookie?.value) {
		return { session: null, user: null };
	}
	return await validateSessionToken(sessionCookie.value);
});
