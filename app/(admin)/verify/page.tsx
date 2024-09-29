"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTransition, useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { invoiceSchema, type Invoice, type Student } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getStudent } from "@/actions/students";
import { Label } from "@/components/ui/label";

export default function Page() {
	const [student, setStudent] = useState<Student | null>(null);
	const { toast } = useToast();
	const [pending, startTransition] = useTransition();

	const form = useForm<Invoice>({
		resolver: zodResolver(invoiceSchema),
		defaultValues: {
			invoiceId: "",
		},
	});

	function submit(values: Invoice) {
		startTransition(async () => {
			try {
				const response = await getStudent(values);
				setStudent(response);
			} catch (error) {
				console.error(error);
				if (error instanceof Error) {
					toast({
						title: "Something went wrong",
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
		<div className="flex flex-col items-center justify-center mt-40">
			{!student ? (
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Student Verification</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
								<FormField
									control={form.control}
									name="invoiceId"
									className="grid items-center gap-2"
									label="Invoice ID"
									render={({ field }) => (
										<Input placeholder="Enter invoice ID" {...field} />
									)}
								/>
								<Button type="submit">
									{pending ? (
										<LoaderCircle className="animate-spin w-4 h-4" />
									) : (
										"Verify student"
									)}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			) : (
				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle>Student Details</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input value={student.name} id="name" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Name</Label>
							<Input value={student.email} id="email" type="email" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="rrr">Name</Label>
							<Input value={student.RRR} id="rrr" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="paidAt">Name</Label>
							<Input
								value={new Date(student.paidAt).toLocaleString()}
								id="paidAt"
								type="datetime-local"
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end">
						<Button onClick={() => setStudent(null)}>Ok</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
