"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { useTheme } from "next-themes";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Select value={theme} onValueChange={setTheme}>
			<SelectTrigger>
				<SelectValue placeholder="Select a theme" />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="light">Light</SelectItem>

				<SelectItem value="dark">Dark</SelectItem>
			</SelectContent>
		</Select>
	);
}
