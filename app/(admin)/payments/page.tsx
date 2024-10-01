"use client";

import { searchStudent } from "@/actions/students";
import { AddStudent } from "@/components/add-student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import type { Student } from "@/lib/constants";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Page() {
	const { toast } = useToast();
	const [data, setData] = useState<Student[] | undefined>();
	const [query, setQuery] = useQueryState("search", {
		defaultValue: "",
		shallow: false,
		clearOnDefault: true,
	});

	const fetchData = useCallback(
		async (searchQuery: string) => {
			try {
				const { error, message } = await searchStudent(searchQuery);
				if (error) {
					toast({
						title: "Something went wrong",
						description: error,
						variant: "destructive",
					});
				}
				setData(message);
			} catch (error) {
				console.error(error);
				toast({
					title: "Something went wrong",
					description: "Internal server error",
					variant: "destructive",
				});
			}
		},
		[toast],
	);

	const useDebounced = useDebouncedCallback((value: string) => {
		setQuery(value);
		fetchData(value);
	}, 300);

	useEffect(() => {
		fetchData(query);
	}, [query, fetchData]);

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<Input
					className="max-w-sm"
					placeholder="Search by student name or invoice ID"
					defaultValue={query}
					onChange={(e) => useDebounced(e.target.value)}
				/>
				<AddStudent />
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Payment Records</CardTitle>
				</CardHeader>
				<CardContent>
					{data ? (
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Student Name</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Invoice ID</TableHead>
										<TableHead>Remita Reference</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.map((payment) => (
										<TableRow key={payment.id}>
											<TableCell>{payment.name}</TableCell>
											<TableCell>${payment.email}</TableCell>
											<TableCell>
												{new Date(payment.paidAt).toLocaleString()}
											</TableCell>
											<TableCell>{payment.invoiceId}</TableCell>
											<TableCell>{payment.RRR}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					) : (
						<div>No data available</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
