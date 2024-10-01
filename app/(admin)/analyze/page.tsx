import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function Page() {
	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Payment Analytics</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-[200px] flex items-end justify-between">
						<div className="w-1/4 bg-blue-500 h-full" />
						<div className="w-1/4 bg-green-500 h-[60%]" />
						<div className="w-1/4 bg-yellow-500 h-[30%]" />
						<div className="w-1/4 bg-red-500 h-[10%]" />
					</div>
					<div className="flex justify-between mt-4 text-sm">
						<div>Total</div>
						<div>Paid</div>
						<div>Pending</div>
						<div>Overdue</div>
					</div>
				</CardContent>
			</Card>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">12345</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">12345</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Amount
						</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$12345</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Overdue Amount
						</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$12345</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
