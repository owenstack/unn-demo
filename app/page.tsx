"use client";

import NavBar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Page() {
	const router = useRouter();
	const { toast } = useToast();
	const [pending, startTransition] = useTransition();
	const [RRR, setRRR] = useState("");

	function submit(e: React.FormEvent) {
		e.preventDefault();
		startTransition(() => {
			//TODO: Implement actual RRR verification from Remit, woulda used my remita account but I have not completed
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
		<>
			<NavBar />
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
		</>
	);
}
