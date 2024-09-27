"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	const { toast } = useToast();
	const [pending, startTransition] = useTransition();
	const [RRR, setRRR] = useState("");

	function submit(e: React.FormEvent) {
		e.preventDefault();
		startTransition(() => {
			try {
				toast({
					title: "Verifying RRR",
					description: "Please wait...",
				});
				setTimeout(() => {
					router.push(`/pay?r=${RRR}`);
				}, 5000);
			} catch (error) {
				console.error(error);
				toast({
					title: "Something went wrong",
					description: "Please try again or contact support",
					variant: "destructive",
				});
			}
		});
	}

	return (
		<section className="flex flex-col gap-4 p-4 items-center justify-center">
			<Card className="max-w-md w-full mt-36">
				<CardHeader>
					<CardTitle>UNN Clearance Portal</CardTitle>
					<CardDescription>Pay for your hostel clearance</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={submit} className="grid gap-4">
						<div>
							<label htmlFor="RRR">Enter your hostel receipt RRR</label>
							<Input
								id="RRR"
								required
								value={RRR}
								onChange={(e) => setRRR(e.target.value)}
							/>
						</div>
						<Button type="submit" disabled={pending}>
							{pending ? (
								<LoaderCircle className="w-4 h-4 animate-spin" />
							) : (
								"Submit"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
