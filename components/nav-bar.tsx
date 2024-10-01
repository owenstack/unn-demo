import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavBar = () => {
	return (
		<nav className="bg-secondary p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-foreground text-2xl font-bold">
					UNN Hostel Payment
				</Link>
				<div className="space-x-4">
					<Button variant="ghost" asChild>
						<Link href="/verify">Dashboard</Link>
					</Button>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
