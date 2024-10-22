import { ChangeEmail } from "@/components/email-change";
import { PasswordChange } from "@/components/password-change";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuth } from "@/lib/auth";

export default async function Page() {
	const { user } = await getAuth();

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Settings</h1>
			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="security">Security</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<Card>
						<CardHeader>
							<CardTitle>General Settings</CardTitle>
							<CardDescription>
								Manage your account settings and preferences.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{user && <ChangeEmail email={user.email} />}
							<div className="space-y-1">
								<Label htmlFor="theme">Theme</Label>
								<ThemeToggle />
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="security">
					<Card>
						<CardHeader>
							<CardTitle>Security Settings</CardTitle>
							<CardDescription>
								Manage your password and security preferences.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{user && <PasswordChange email={user.email} />}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
