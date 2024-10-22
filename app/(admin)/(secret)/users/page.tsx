import { AddUser } from "@/components/add-user";
import { AdminTable } from "@/components/admin-table";
import { TableLoader } from "@/components/table-loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuth } from "@/lib/auth";
import prisma from "@/lib/db";
import { TriangleAlert } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
	const { user } = await getAuth();
	if (user?.roleId !== 0) redirect("/dashboard");
	const users = await prisma.user.findMany({
		where: { id: { not: user?.id } },
		select: { id: true, fullName: true, email: true, roleId: true },
	});

	if (users.length === 0)
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>User Management</CardTitle>
					<AddUser />
				</CardHeader>
				<CardContent className="flex flex-col gap-8">
					<TriangleAlert />
					<h2>Something went wrong</h2>
					<p>No users found</p>
				</CardContent>
			</Card>
		);
	if (users && users.length > 0)
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>User Management</CardTitle>
					<AddUser />
				</CardHeader>
				<CardContent>
					<Suspense fallback={<TableLoader />}>
						<AdminTable users={users} />
					</Suspense>
				</CardContent>
			</Card>
		);
}
