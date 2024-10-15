import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthLayout({
	children,
}: { children: ReactNode }) {
	const { user } = await getAuth();

	if (user) redirect("/verify");

	return <>{children}</>;
}
