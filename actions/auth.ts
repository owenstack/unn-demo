"use server";

import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/db";
import { signUpSchema, signInSchema } from "@/lib/constants";
import { getAuth } from "@/lib/auth";

export async function signUp(formData: FormData) {
	const formDataRaw = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		fullName: formData.get("fullName") as string,
	};

	const { email, password, fullName } =
		await signUpSchema.parseAsync(formDataRaw);

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(10);

	await prisma.user.create({
		data: {
			id: userId,
			email,
			hashedPassword,
			roleId: 1,
			fullName,
		},
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	redirect("/dashboard");
}

export async function signIn(formData: FormData) {
	const formDataRaw = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { email, password } = await signInSchema.parseAsync(formDataRaw);
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw new Error("Incorrect email or password");
	const validPassword = await new Argon2id().verify(
		user.hashedPassword,
		password,
	);
	if (!validPassword) throw new Error("Incorrect email or password");
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	redirect("/dashboard");
}

export async function signOut(_formData: FormData) {
	const { session } = await getAuth();
	if (!session) {
		redirect("/login");
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	redirect("/login");
}