"use client";

import { createStudent } from "@/actions/students";
import { useToast } from "@/hooks/use-toast";
import type { Student } from "@/lib/constants";
import { studentModel } from "@/prisma/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AddStudent() {
	const [pending, startTransition] = useTransition();
	const { toast } = useToast();
	const form = useForm<Student>({
		resolver: zodResolver(studentModel),
		defaultValues: {
			id: nanoid(10),
			name: "",
			email: "",
			RRR: "",
			invoiceId: "",
			paidAt: new Date(),
		},
	});

	function submit(values: Student) {
		startTransition(async () => {
			try {
				const { error, message } = await createStudent(values);
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
		<Dialog>
			<DialogTrigger asChild>
				<Button>Add New Payment</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Payment</DialogTitle>
					<DialogDescription>
						Enter the details for the new payment.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className="grid gap-4 py-4"
					>
						<FormField
							name="name"
							control={form.control}
							className="grid grid-cols-4 items-center gap-4"
							render={({ field }) => (
								<>
									<Label htmlFor="name" className="text-right">
										Student Name
									</Label>
									<Input
										id="name"
										autoComplete="name"
										className="col-span-3"
										{...field}
									/>
								</>
							)}
						/>
						<FormField
							name="email"
							control={form.control}
							className="grid grid-cols-4 items-center gap-4"
							render={({ field }) => (
								<>
									<Label htmlFor="email" className="text-right">
										Student Name
									</Label>
									<Input
										id="email"
										type="email"
										autoComplete="email"
										className="col-span-3"
										{...field}
									/>
								</>
							)}
						/>
						<FormField
							name="RRR"
							control={form.control}
							className="grid grid-cols-4 items-center gap-4"
							render={({ field }) => (
								<>
									<Label htmlFor="RRR" className="text-right">
										Student Name
									</Label>
									<Input id="RRR" className="col-span-3" {...field} />
								</>
							)}
						/>
						<FormField
							name="invoiceId"
							control={form.control}
							className="grid grid-cols-4 items-center gap-4"
							render={({ field }) => (
								<>
									<Label htmlFor="invoiceId" className="text-right">
										Student Name
									</Label>
									<Input id="invoiceId" className="col-span-3" {...field} />
								</>
							)}
						/>
						<Button type="submit" disabled={pending}>
							{pending ? (
								<LoaderCircle className="w-4 h-4 animate-spin" />
							) : (
								"Add student"
							)}
						</Button>
					</form>
				</Form>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Student Name
						</Label>
						<Input id="name" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="amount" className="text-right">
							Amount
						</Label>
						<Input id="amount" type="number" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="invoiceId" className="text-right">
							Invoice ID
						</Label>
						<Input id="invoiceId" className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save Payment</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
