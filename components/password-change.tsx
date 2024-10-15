"use client";

import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { changePassword } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
	.object({
		email: z.string().email(),
		password: z.string(),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export function PasswordChange({ email }: { email: string }) {
	const [pending, startTransition] = useTransition();
	const { toast } = useToast();
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			email,
			password: "",
			confirmPassword: "",
		},
	});

	function submit(values: z.infer<typeof schema>) {
		startTransition(async () => {
			try {
				const { email, password } = values;
				const { message, error } = await changePassword(email, password);
				if (error) {
					toast({
						title: "Something went wrong",
						description: error,
						variant: "destructive",
					});
				} else {
					toast({
						title: "Success",
						description: message,
					});
				}
			} catch (error) {
				console.error(error);
				toast({
					title: "Something went wrong",
					description: "Internal server error",
					variant: "destructive",
				});
			}
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
				<FormField
					className="space-y-1"
					name="email"
					label="Email"
					control={form.control}
					render={({ field }) => <Input type="email" disabled {...field} />}
				/>
				<FormField
					className="space-y-1"
					name="password"
					label="New Password"
					control={form.control}
					render={({ field }) => (
						<Input type="password" autoComplete="new-password" {...field} />
					)}
				/>
				<FormField
					className="space-y-1"
					name="confirmPassword"
					label="Confirm Password"
					control={form.control}
					render={({ field }) => <Input type="password" {...field} />}
				/>
				<Button type="submit" disabled={pending}>
					{pending ? (
						<LoaderCircle className="h-4 w-4 animate-spin" />
					) : (
						"Update"
					)}
				</Button>
			</form>
		</Form>
	);
}
