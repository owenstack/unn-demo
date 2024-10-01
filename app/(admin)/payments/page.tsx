"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { paymentData } from "@/lib/constants";
import { useState } from "react";

//TODO: Integrate with PayStack APIs

export default function Page() {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredPayments = paymentData.filter(
		(payment) =>
			payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const totalAmount = paymentData.reduce(
		(sum, payment) => sum + payment.amount,
		0,
	);
	const paidAmount = paymentData
		.filter((payment) => payment.status === "Paid")
		.reduce((sum, payment) => sum + payment.amount, 0);
	const pendingAmount = paymentData
		.filter((payment) => payment.status === "Pending")
		.reduce((sum, payment) => sum + payment.amount, 0);
	const overdueAmount = paymentData
		.filter((payment) => payment.status === "Overdue")
		.reduce((sum, payment) => sum + payment.amount, 0);
	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<Input
					className="max-w-sm"
					placeholder="Search by student name or invoice ID"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
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
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Payment Records</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Student Name</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Invoice ID</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredPayments.map((payment) => (
									<TableRow key={payment.id}>
										<TableCell>{payment.studentName}</TableCell>
										<TableCell>${payment.amount}</TableCell>
										<TableCell>{payment.date}</TableCell>
										<TableCell>{payment.invoiceId}</TableCell>
										<TableCell>
											<span
												className={`px-2 py-1 rounded-full text-xs font-semibold
							${
								payment.status === "Paid"
									? "bg-green-100 text-green-800"
									: payment.status === "Pending"
										? "bg-yellow-100 text-yellow-800"
										: "bg-red-100 text-red-800"
							}`}
											>
												{payment.status}
											</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
