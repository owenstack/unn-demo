import { z } from "zod";
import type { studentModel } from "@/prisma/zod";

export interface Menu {
	name: string;
	url: string;
	icon: string;
}
export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type Student = z.infer<typeof studentModel>;

export const sidebarList: Menu[] = [
	{
		name: "Dashboard",
		url: "/dashboard",
		icon: "LayoutGrid",
	},
	{
		name: "Payments",
		url: "/payments",
		icon: "CreditCard",
	},
	{
		name: "Users",
		url: "/users",
		icon: "Users",
	},
	{
		name: "Verification",
		url: "/verify",
		icon: "FileText",
	},
	{
		name: "Analytics",
		url: "/analyze",
		icon: "BarChart",
	},
];

export const signUpSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email")
		.refine((email) => email.endsWith("@unn.edu.ng"), {
			message: "Email must end with @unn.edu.ng",
		}),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
	fullName: z.string().min(8),
});

export const signInSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email")
		.refine((email) => email.endsWith("@unn.edu.ng"), {
			message: "Email must end with @unn.edu.ng",
		}),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
});

// Mock data
export const paymentData = [
	{
		id: 1,
		studentName: "John Doe",
		amount: 500,
		date: "2023-09-15",
		invoiceId: "INV-001",
		status: "Paid",
	},
	{
		id: 2,
		studentName: "Jane Smith",
		amount: 750,
		date: "2023-09-16",
		invoiceId: "INV-002",
		status: "Pending",
	},
	{
		id: 3,
		studentName: "Bob Johnson",
		amount: 600,
		date: "2023-09-17",
		invoiceId: "INV-003",
		status: "Paid",
	},
	{
		id: 4,
		studentName: "Alice Brown",
		amount: 550,
		date: "2023-09-18",
		invoiceId: "INV-004",
		status: "Overdue",
	},
	{
		id: 5,
		studentName: "Charlie Davis",
		amount: 800,
		date: "2023-09-19",
		invoiceId: "INV-005",
		status: "Paid",
	},
];

export const userData = [
	{ id: 1, name: "Admin User", role: "admin", email: "admin@unn.edu.ng" },
	{ id: 2, name: "Dean User", role: "dean", email: "dean@unn.edu.ng" },
	{
		id: 3,
		name: "Supervisor User",
		role: "supervisor",
		email: "supervisor@unn.edu.ng",
	},
];

export const invoiceSchema = z.object({
	invoiceId: z
		.string()
		.max(8)
		.refine((p) => p.startsWith("INV-"), {
			message: "Invoice ID must start with INV-",
		}),
});
