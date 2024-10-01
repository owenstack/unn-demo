"use server";

import { getAuth } from "@/lib/auth";
import type { UpdateAdmin } from "@/lib/constants";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
	try {
		const { user } = await getAuth();
		if (!(user?.roleId === 0)) return { error: "Unauthorized operation" };
		const response = await prisma.user.delete({ where: { id } });
		if (!response) return { error: "User delete failed" };
		revalidatePath("/users");
		return { success: true, message: "User deleted successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" };
	}
}

export async function updateUser(values: UpdateAdmin) {
	try {
		const { user } = await getAuth();
		if (!(user?.roleId === 0)) return { error: "Unauthorized operation" };
		const response = await prisma.user.update({
			where: { id: values.id },
			data: values,
		});
		if (!response) return { error: "User update failed" };
		revalidatePath("/users");
		return { success: true, message: "User updated successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" };
	}
}

export async function getUsers() {
	try {
		const { user } = await getAuth();
		if (!(user?.roleId === 0)) return { error: "Unauthorized operation" };
		const response = await prisma.user.findMany({
			where: {
				id: {
					not: user?.id,
				},
			},
			select: {
				id: true,
				fullName: true,
				email: true,
				roleId: true,
			},
		});
		if (!response) return { error: "No users found" };
		return { success: true, message: response };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" };
	}
}
