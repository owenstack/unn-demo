import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, Milestone } from "lucide-react";
import { SideBar } from "./side-bar";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { getAuth } from "@/lib/auth";
import { Title } from "./title";
import { sidebarList } from "@/lib/constants";
import { LogOut } from "./log-out";

export async function DashNav() {
	const { user } = await getAuth();
	const routes = sidebarList.filter((p) => {
		if (user?.roleId === 1) {
			return p.url === "/verify";
		}
		if (user?.roleId === 2) {
			return p.url !== "/users";
		}
		return true;
	});

	return (
		<header className="flex justify-between items-center p-4 shadow-md">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="lg:hidden">
						<Menu className="h-6 w-6" />
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
