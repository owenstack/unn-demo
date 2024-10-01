import { getUsers } from "@/actions/admin";
import { AddUser } from "@/components/add-user";
import { AdminTable } from "@/components/admin-table";
import { TableLoader } from "@/components/table-loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import { Suspense } from "react";

export default async function Page() {
	const { message, error } = await getUsers();
	if (error)
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>User Management</CardTitle>
					<AddUser />
				</CardHeader>
				<CardContent className="flex flex-col gap-8">
					<TriangleAlert />
					<h2>Something went wrong</h2>
					<p>{error}</p>
				</CardContent>
			</Card>
		);
	if (message)
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>User Management</CardTitle>
					<AddUser />
				</CardHeader>
				<CardContent>
					<Suspense fallback={<TableLoader />}>
						<AdminTable users={message} />
					</Suspense>
				</CardContent>
			</Card>
		);
}
