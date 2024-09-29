import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { userData } from "@/lib/constants";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Page() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>User Management</CardTitle>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add New User</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New User</DialogTitle>
							<DialogDescription>
								Enter the details for the new user.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input id="name" className="col-span-3" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>
								<Input id="email" type="email" className="col-span-3" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="role" className="text-right">
									Role
								</Label>
								<select id="role" className="col-span-3 p-2 border rounded">
									<option value="admin">Admin</option>
									<option value="dean">Dean</option>
									<option value="supervisor">Supervisor</option>
								</select>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Save User</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardHeader>
			<CardContent>
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
							{userData.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell className="capitalize">{user.role}</TableCell>
									<TableCell>
										<Button variant="outline" size="sm" className="mr-2">
											Edit
										</Button>
										<Button variant="destructive" size="sm">
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
