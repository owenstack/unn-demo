"use server";

import prisma from "@/lib/db";
import { type Invoice, invoiceSchema } from "@/lib/constants";

export async function getStudent(values: Invoice) {
	const { invoiceId } = await invoiceSchema.parseAsync(values);

	const response = await prisma.student.findUnique({ where: { invoiceId } });
	if (!response) throw new Error("Invoice not found");
	return response;
}
