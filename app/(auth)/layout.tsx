import { getAuth } from "@/lib/auth";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

export default async function AuthLayout({
	children,
}: { children: ReactNode }) {
	const { session } = await getAuth();

	if (!session) redirect("/verify");

	return <>{children}</>;
}
