"use client";

import { sidebarList } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function Title() {
	const pathname = usePathname();
	return (
		<h1 className="text-2xl font-bold hidden sm:block">
			{sidebarList.filter((p) => pathname === p.url).map((p) => p.name)}
		</h1>
	);
}
