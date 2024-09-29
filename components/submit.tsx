"use client";

import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export function Submit({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending} className={className}>
			{pending ? <LoaderCircle className="w-4 h-4 animate-spin" /> : children}
		</Button>
	);
}
