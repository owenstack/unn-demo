"use client";

import { updateUser } from "@/actions/admin";
import { useToast } from "@/hooks/use-toast";
import type { UpdateAdmin } from "@/lib/constants";
import { LoaderCircle, Pencil } from "lucide-react";
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

export function UpdateUser({ values }: { values: UpdateAdmin }) {
	const { toast } = useToast();
	const [pending, startTransition] = useTransition();
	const form = useForm<UpdateAdmin>({
		defaultValues: {
			id: values.id,
			email: values.email,
			fullName: values.fullName,
			roleId: values.roleId,
		},
	});

	function submit(values: UpdateAdmin) {
		startTransition(async () => {
			try {
				const { error, message } = await updateUser(values);
				if (error) {
					toast({
						title: "User update failed",
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
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Pencil className="w-4 h-4 mr-2" /> User
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit user</DialogTitle>
					<DialogDescription>
						Change the user detail as necessary.
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
								"Update user"
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
