import { z } from "zod";

interface Menu {
	name: string;
	url: string;
	icon: string;
}
export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;

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
