"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
