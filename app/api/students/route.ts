import prisma from "@/lib/db";
import { studentModel } from "@/prisma/zod";

export async function POST(req: Request) {
	const body = await req.json();
	try {
		const { data, error } = await studentModel.safeParseAsync(body);
		if (error) return new Response("Invalid body received", { status: 401 });
		const response = await prisma.student.create({ data });
		if (response) return new Response("", { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(`Error: ${error}`, { status: 500 });
	}
}
