import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function SecretLayout({
	children,
}: { children: ReactNode }) {
	const { user } = await getAuth();
	if (user?.roleId === 1) redirect("/verify");

	return <>{children}</>;
}
