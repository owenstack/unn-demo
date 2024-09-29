"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuLinkProps {
	url: string;
	name: string;
	icon: string;
	className?: string;
	showTextOnMobile?: boolean;
}

export function MenuLink({
	url,
	name,
	icon,
	className,
	showTextOnMobile = true,
}: MenuLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === url;
	const Icon = LucideIcons[
		icon as keyof typeof LucideIcons
	] as LucideIcons.LucideIcon;

	const linkContent = (
		<div className="flex items-center w-full">
			{Icon && <Icon className="w-5 h-5 mr-3" />}
			{showTextOnMobile ? (
				<span>{name}</span>
			) : (
				<span className="hidden sm:inline">{name}</span>
			)}
		</div>
	);

	const linkClass = `
    flex items-center px-4 py-2 text-sm font-medium rounded-md
    transition-colors duration-150 ease-in-out
    ${
			isActive
				? "bg-accent text-foreground"
				: "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
		}
  `;

	const linkElement = (
		<Link href={url} className={linkClass}>
			{linkContent}
		</Link>
	);

	if (!showTextOnMobile) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>{linkElement}</TooltipTrigger>
					<TooltipContent>
						<p>{name}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return linkElement;
}
