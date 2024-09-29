import type { ReactNode } from "react";
import { SideBar } from "@/components/side-bar";
import { DashNav } from "@/components/dash-nav";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashLayout({
	children,
}: { children: ReactNode }) {
	const { user } = await getAuth();
	if (!user) redirect("/login");
	return (
		<div className="flex h-screen">
			{/* Sidebar for larger screens */}
			<div className="hidden lg:block w-64 shadow-lg">
				<SideBar />
			</div>
			{/* Main content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Navbar */}
				<DashNav />
				{/* Page content */}
				<main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
					{children}
				</main>
			</div>
		</div>
	);
}
