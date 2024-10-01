"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
	const pathname = usePathname();
	const isDashboard =
		pathname === "/dashboard" || pathname.startsWith("/dashboard/");

	return (
		<nav className="bg-secondary p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-foreground text-2xl font-bold">
					UNN Hostel Payment
				</Link>
				{isDashboard ? (
					<div className="space-x-4">
						<Button variant="ghost" asChild>
							<Link href="/dashboard/payments">Payments</Link>
						</Button>
						<Button variant="ghost" asChild>
							<Link href="/dashboard/bookings">Bookings</Link>
						</Button>
						<Button variant="ghost" asChild>
							<Link href="/dashboard/profile">Profile</Link>
						</Button>
						<Button variant="ghost">Logout</Button>
					</div>
				) : (
					<div className="space-x-4">
						<Button variant="ghost" asChild>
							<Link href="/dashboard">Dashboard</Link>
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
