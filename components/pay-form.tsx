"use client";

import { createStudent } from "@/actions/students";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { studentModel } from "@/prisma/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { usePaystackPayment } from "react-paystack";
import type { z } from "zod";

export function PayForm({ rrr }: { rrr: string }) {
	const { toast } = useToast();
	const [pending, startTransition] = useTransition();
	const [invoiceId, setInvoiceId] = useState("");
	const form = useForm<z.infer<typeof studentModel>>({
		resolver: zodResolver(studentModel),
		defaultValues: {
			id: nanoid(10),
			name: "",
			email: "",
			RRR: rrr,
			invoiceId,
			paidAt: new Date(),
		},
	});

	const onSuccess = () => {
		setInvoiceId(`INV-${rrr.substring(0, 7)}`);
		startTransition(async () => {
			try {
				const { error, message } = await createStudent(form.getValues());
				if (error) {
					toast({
						title: "Something went wrong",
						description: error,
						variant: "destructive",
					});
				}
				toast({
					title: message,
					description: "Closing webpage now",
				});
				setTimeout(() => {
					window.close();
				}, 2000);
			} catch (error) {
				console.error(error);
				toast({
					title: "Something went wrong",
					description: "Internal server error",
					variant: "destructive",
				});
			}
		});
	};

	const onClose = () => {
		toast({
			title: "Payment Canceled",
			description: "Are you sure about that?",
		});
	};

	const config = {
		publicKey: "pk_test_2255cad94acf9d391fc7b3fb02d287d00ee1ea09",
		reference: form.getValues("RRR"),
		email: form.getValues("email"),
		amount: 20000, //N200 as it is a test, to actually confirm functionality you may have to pay that is why it is set to a very low amount
		onSuccess,
		onClose,
	};
	const initPay = usePaystackPayment(config);

	function submit() {
		try {
			initPay(config);
		} catch (error) {
			console.error(error);
			toast({
				title: "Something went wrong",
				description: "Failed to save your information",
				variant: "destructive",
			});
		}
	}
	return (
		<div className="flex items-center justify-center min-h-screen ">
			<div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center ">Payment Form</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
						<FormField
							name="name"
							label="Your full name"
							render={({ field }) => (
								<Input
									placeholder="Bola Ahmed Tinubu"
									required
									autoComplete="name"
									className="w-full px-4 py-2 rounded-md"
									{...field}
								/>
							)}
						/>
						<FormField
							name="email"
							label="Your email address"
							render={({ field }) => (
								<Input
									placeholder="tinubu@fg.gov.ng"
									required
									autoComplete="email"
									type="email"
									className="w-full px-4 py-2 border rounded-md "
									{...field}
								/>
							)}
						/>
						<FormField
							name="rrr"
							label="Remita Retrieval Reference"
							render={({ field }) => (
								<Input
									{...field}
									disabled
									className="w-full px-4 py-2 border rounded-md"
									value={rrr}
								/>
							)}
						/>
						<Button type="submit" className="w-full px-4 py-2">
							{pending ? (
								<LoaderCircle className="w-4 h-4 animate-spin" />
							) : (
								"Submit"
							)}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
