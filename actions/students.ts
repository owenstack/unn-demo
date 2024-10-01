"use server";

import { type Invoice, type Student, invoiceSchema } from "@/lib/constants";
import prisma from "@/lib/db";
import { studentModel } from "@/prisma/zod";

export async function getStudent(values: Invoice) {
	try {
		const { data, error } = await invoiceSchema.safeParseAsync(values);
		if (error) return { error: "Invalid body received" };
		const { invoiceId } = data;
		const response = await prisma.student.findUnique({
			where: { invoiceId },
		});
		if (!response) return { error: "Student not found" };
		return { success: true, message: response };
	} catch (err) {
		console.error(err);
		return { error: "Internal server error" };
	}
}

export async function createStudent(values: Student) {
	try {
		const { data, error } = await studentModel.safeParseAsync(values);
		if (error) return { error: "Invalid body received" };
		const response = await prisma.student.create({ data });
		if (!response) return { error: "Failed to create student" };
		return { success: true, message: "User created successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}

export async function searchStudent(search: string) {
	try {
		const students = await prisma.student.findMany({
			where: {
				OR: [
					{ invoiceId: { contains: search } },
					{ name: { contains: search } },
				],
			},
		});
		if (!students) return { error: "Students not found" };
		return { success: true, message: students };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}
