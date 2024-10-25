"use server";

import { getAuth } from "@/lib/auth";
import { adminSchema, signInSchema, signUpSchema } from "@/lib/constants";
import prisma from "@/lib/db";
import {
	createSession,
	invalidateSession,
	setSessionTokenCookie,
	deleteSessionTokenCookie,
	generateSessionToken,
} from "@/lib/session";
import { Argon2id } from "oslo/password";
import { nanoid } from "nanoid";

export async function signUp(formData: FormData) {
	const formDataRaw = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		fullName: formData.get("fullName") as string,
	};
	try {
		const { data, error } = await signUpSchema.safeParseAsync(formDataRaw);
		if (error) return { error: "Invalid body received" };
		const { email, password, fullName } = data;
		const hashedPassword = await new Argon2id().hash(password);
		const userId = nanoid(10);

		await prisma.user.create({
			data: {
				id: userId,
				email,
				hashedPassword,
				roleId: 1,
				fullName,
			},
		});

		const token = generateSessionToken();
		const session = await createSession(token, userId);
		setSessionTokenCookie(token, session.expiresAt);
		return { success: true, redirectTo: "/verify" };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" };
	}
}

export async function createAdmin(formData: FormData) {
	const formDataRaw = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		fullName: formData.get("fullName") as string,
		roleId: formData.get("roleId") as unknown as number,
	};
	try {
		const { data, error } = await adminSchema.safeParseAsync(formDataRaw);
		if (error) return { error: "Invalid body received" };
		const { email, password, roleId, fullName } = data;
		const hashedPassword = await new Argon2id().hash(password);
		const userId = nanoid(10);

		const user = await prisma.user.create({
			data: {
				id: userId,
				email,
				hashedPassword,
				roleId,
				fullName,
			},
		});
		if (!user) return { error: "User creation failed" };
		return { success: true, message: "User created successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" };
	}
}

export async function signIn(formData: FormData) {
	const formDataRaw = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};
	try {
		const { data, error } = await signInSchema.safeParseAsync(formDataRaw);
		if (error) return { error: "Invalid body received" };
		const { email, password } = data;
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return { error: "Incorrect email or password" };
		const validPassword = await new Argon2id().verify(
			user.hashedPassword,
			password,
		);
		if (!validPassword) return { error: "Incorrect email or password" };
		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(token, session.expiresAt);
		return { success: true, redirectTo: "/verify" };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" };
	}
}

export async function signOut() {
	const { session } = await getAuth();
	if (!session) {
		return { success: true, redirectTo: "/login" };
	}
	try {
		await invalidateSession(session.id);
		deleteSessionTokenCookie();
		return { success: true, redirectTo: "/login" };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}

export async function changePassword(email: string, password: string) {
	try {
		const { user } = await getAuth();
		if (!user) return { error: "Not authenticated" };
		if (user.email !== email)
			return { error: "Email does not match logged in user" };
		const response = await prisma.user.update({
			where: {
				email,
			},
			data: {
				hashedPassword: await new Argon2id().hash(password),
			},
		});
		if (!response) return { error: "Failed to update password" };
		return { success: true, message: "Password updated successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}

export async function changeEmail(email: string) {
	try {
		const { user } = await getAuth();
		const response = await prisma.user.update({
			where: {
				id: user?.id,
			},
			data: {
				email: email,
			},
		});
		if (!response) return { error: "Failed to update email" };
		return { success: true, message: "Email updated successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}
