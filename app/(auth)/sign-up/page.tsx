"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type SignUp, signUpSchema } from "@/lib/constants";
import { Form, FormField } from "@/components/ui/form";
import { signUp } from "@/actions/auth";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

//TODO: Delete this page to prevent unauthorized account creation. Since it is an internal tool, admin will create, modify and delete users

export default function Page() {
	const { toast } = useToast();
	const [pending, startTransition] = useTransition();
	const form = useForm<SignUp>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
		},
	});

	function submit(values: SignUp) {
		const form = new FormData();
		form.append("fullName", values.fullName);
		form.append("email", values.email);
		form.append("password", values.password);
		startTransition(async () => {
			try {
				await signUp(form);
			} catch (error) {
				console.error(error);
				if (error instanceof Error) {
					toast({
						title: "Login Failed",
						description: error.message,
						variant: "destructive",
					});
				}
				toast({
					title: "Something went wrong",
					description: "Internal server error",
					variant: "destructive",
				});
			}
		});
	}
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-4.5rem)]">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(submit)} className="grid gap-2">
							<FormField
								name="fullName"
								control={form.control}
								label="Full name"
								render={({ field }) => (
									<Input
										placeholder="Bola Ahmed"
										autoComplete="name"
										{...field}
									/>
								)}
							/>
							<FormField
								name="email"
								control={form.control}
								label="Email"
								render={({ field }) => (
									<Input
										type="email"
										autoComplete="work email"
										placeholder="example@unn.edu.ng"
										{...field}
									/>
								)}
							/>
							<FormField
								name="password"
								control={form.control}
								label="Password"
								render={({ field }) => (
									<Input
										type="password"
										autoComplete="new-password"
										{...field}
									/>
								)}
							/>
							<Button type="submit" className="w-full" disabled={pending}>
								{pending ? (
									<LoaderCircle className="w-4 h-4 animate-spin" />
								) : (
									"Sign up"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex items-center justify-end">
					<Button variant={"link"}>
						<Link href="/login">Log in</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
