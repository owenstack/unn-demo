import { getStudents } from "@/actions/students";
import { PaymentChart } from "@/components/payment-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CreditCard, Download, Users } from "lucide-react";

export default async function Page() {
	const response = await getStudents();
	if (!response) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>No Data</CardTitle>
				</CardHeader>
				<CardContent>No student data found</CardContent>
			</Card>
		);
	}

	const data = response.reduce<{ month: string; count: number }[]>(
		(acc, student) => {
			const month = new Date(student.paidAt).toLocaleString("default", {
				month: "long",
			});
			const existingMonth = acc.find((item) => item.month === month);
			if (existingMonth) {
				existingMonth.count++;
			} else {
				acc.push({ month, count: 1 });
			}
			return acc;
		},
		[],
	);

	const totalRevenue = data.reduce((total, item) => total + item.count, 0);

	const today = new Date().setHours(0, 0, 0, 0);
	const paymentsToday = response.reduce((total, item) => {
		const paymentDate = new Date(item.paidAt).setHours(0, 0, 0, 0);
		return paymentDate === today ? total + 10000 : total;
	}, 0);

	return (
		<Tabs defaultValue="overview" className="space-y-4">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="reports">Reports</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" className="space-y-4">
				<PaymentChart data={data} />
				{/* Summary Cards */}
				<div className="grid gap-4 md:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<CreditCard className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">₦ {totalRevenue}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Payments Today
							</CardTitle>
							<Calendar className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">₦ {paymentsToday}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Students
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{response.length}</div>
						</CardContent>
					</Card>
				</div>
			</TabsContent>
			<TabsContent value="reports">
				<Card>
					<CardHeader>
						<CardTitle>Reports</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							Generate and download various reports related to payments,
							students, and overall financial status.
						</p>
						<Button className="mt-4">
							<Download className="mr-2 h-4 w-4" />
							Download Report
						</Button>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
