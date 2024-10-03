"use client";

import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { changeEmail } from "@/actions/auth";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";

const schema = z.object({
	email: z.string().email(),
});

export function ChangeEmail({ email }: { email: string }) {
	const [pending, startTransition] = useTransition();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: email,
		},
	});

	function submit(values: z.infer<typeof schema>) {
		startTransition(async () => {
			try {
				const { error, message } = await changeEmail(values.email);
				if (error) {
					toast({
						title: "Something went wrong",
						description: error,
						variant: "destructive",
					});
				}

				toast({
					title: "Success",
					description: message,
				});
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
			<form
				onSubmit={form.handleSubmit(submit)}
				className="flex flex-col items-start gap-4"
			>
				<FormField
					name="email"
					control={form.control}
					label="Email"
					className="w-full"
					render={({ field }) => (
						<Input type="email" autoComplete="work email" {...field} />
					)}
				/>
				<Button type="submit" disabled={pending}>
					{pending ? (
						<LoaderCircle className="w-4 h-4 animate-spin" />
					) : (
						"Update"
					)}
				</Button>
			</form>
		</Form>
	);
}
