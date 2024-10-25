import type { Menu } from "@/lib/constants";
import type { User } from "@prisma/client";
import { Milestone, Sidebar } from "lucide-react";
import { LogOut } from "./log-out";
import { SideBar } from "./side-bar";
import { Title } from "./title";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function DashNav({ routes, user }: { routes: Menu[]; user: User }) {
	return (
		<header className="flex justify-between items-center p-4 shadow-md">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="lg:hidden">
						<Sidebar className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-64 p-0">
					<SideBar routes={routes} />
				</SheetContent>
			</Sheet>
			<Title />
			<div className="flex items-center space-x-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">{user?.fullName}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Milestone className="mr-2 h-4 w-4" />
							<span>
								{user?.roleId === 0
									? "Admin"
									: user?.roleId === 1
										? "Supervisor"
										: "Dean"}
							</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LogOut />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
