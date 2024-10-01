"use client";

import { signOut } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function LogOut() {
	const { toast } = useToast();
	const [pending, setPending] = useState(false);

	const logOut = async () => {
		setPending(true);
		try {
			await signOut();
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				toast({
					title: "Something went wrong",
					description: error.message,
					variant: "destructive",
				});
			}
		} finally {
			setPending(false);
		}
	};

	return (
		<Button
			className="w-full"
			variant={"outline"}
			disabled={pending}
			onClick={logOut}
		>
			{pending ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Log out"}
		</Button>
	);
}
