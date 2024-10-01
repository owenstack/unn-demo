"use client";

import type { UpdateAdmin } from "@/lib/constants";
import { DeleteUser } from "./delete-user";
import { UpdateUser } from "./edit-user";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

export function AdminTable({ users }: { users: UpdateAdmin[] }) {
	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.fullName}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell className="capitalize">
								{user.roleId === 0
									? "Admin"
									: user.roleId === 1
										? "Supervisor"
										: "Dean"}
							</TableCell>
							<TableCell className="flex gap-4">
								<UpdateUser values={user} />
								<DeleteUser userId={user.id} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
