import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthLayout({
	children,
}: { children: ReactNode }) {
	const { session } = await getAuth();

	if (!session) redirect("/verify");

	return <>{children}</>;
}
