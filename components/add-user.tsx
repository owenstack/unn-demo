"use client";

import { createAdmin } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { type Admin, adminSchema } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export function AddUser() {
	const [pending, startTransition] = useTransition();
	const { toast } = useToast();
	const form = useForm<Admin>({
		resolver: zodResolver(adminSchema),
		defaultValues: {
			email: "",
			fullName: "",
			password: "",
			roleId: 1,
		},
	});

	function submit(values: Admin) {
		const form = new FormData();
		form.append("fullName", values.fullName);
		form.append("email", values.email);
		form.append("password", values.password);
		form.append("roleId", values.roleId.toString());
		startTransition(async () => {
			try {
				const { error, message } = await createAdmin(form);
				if (error) {
					toast({
						title: "Failed to create user",
						description: error,
						variant: "destructive",
					});
				}
				toast({
					title: "Success",
					description: message,
				});
			} catch (err) {
				console.error(err);
				toast({
					title: "Something went wrong",
					description: "Internal server error",
					variant: "destructive",
				});
			}
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle className="w-4 h-4 mr-2" /> Add User
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add new user</DialogTitle>
					<DialogDescription>
						Enter the details for the new user.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className="grid gap-4 py-4"
					>
						<FormField
							control={form.control}
							name="fullName"
							label="Full Name"
							className="grid grid-cols-4 items-center gap-4"
							render={({ field }) => (
								<Input className="col-span-3" {...field} autoComplete="name" />
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							label="Email"
							className="grid grid-cols-4 items-center gap-4"
							render={({ field }) => (
								<Input
									className="col-span-3"
									{...field}
									autoComplete="email"
									type="email"
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							label="Full Name"
							className="grid grid-cols-4 items-center gap-4"
							render={({ field }) => (
								<Input className="col-span-3" {...field} autoComplete="name" />
							)}
						/>
						<FormField
							control={form.control}
							name="roleId"
							label="Designated role"
							className="grid grid-cols-4 items-center gap-4"
							render={({ field }) => (
								<Select
									onValueChange={(value) => field.onChange(Number(value))}
									defaultValue={field.value?.toString()}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="0">Admin</SelectItem>
										<SelectItem value="1">Supervisor</SelectItem>
										<SelectItem value="2">Dean</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						<Button type="submit" disabled={pending}>
							{pending ? (
								<LoaderCircle className="animate-spin h-4 w-4" />
							) : (
								"Add User"
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
