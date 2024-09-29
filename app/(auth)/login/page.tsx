"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type SignIn, signInSchema } from "@/lib/constants";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signIn } from "@/actions/auth";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
	const { toast } = useToast();
	const [pending, startTransition] = useTransition();
	const form = useForm<SignIn>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function submit(values: SignIn) {
		const form = new FormData();
		form.append("email", values.email);
		form.append("password", values.password);
		startTransition(async () => {
			try {
				await signIn(form);
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
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(submit)} className="grid gap-2">
							<FormField
								name="email"
								label="Email"
								control={form.control}
								render={({ field }) => (
									<Input
										type="email"
										autoComplete="work email"
										{...field}
										placeholder="example@unn.edu.ng"
									/>
								)}
							/>
							<FormField
								name="password"
								label="Password"
								control={form.control}
								render={({ field }) => (
									<Input
										type="password"
										autoComplete="current-password"
										{...field}
									/>
								)}
							/>

							<Button type="submit" className="w-full" disabled={pending}>
								{pending ? (
									<LoaderCircle className="w-4 h-4 animate-spin" />
								) : (
									"Sign in"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex items-center justify-end">
					<Button variant={"link"}>
						<Link href="/sign-up">Sign up</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
