"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paymentData } from "@/lib/constants";
import { Calendar, CreditCard, Download, Users } from "lucide-react";
import React, { useState } from "react";

export default function Dashboard() {
	return (
		<Tabs defaultValue="overview" className="space-y-4">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="details">Details</TabsTrigger>
				<TabsTrigger value="reports">Reports</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Payment Analytics</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[200px] flex items-end justify-between">
							<div className="w-1/4 bg-blue-500 h-full" />
							<div className="w-1/4 bg-green-500 h-[60%]" />
							<div className="w-1/4 bg-yellow-500 h-[30%]" />
							<div className="w-1/4 bg-red-500 h-[10%]" />
						</div>
						<div className="flex justify-between mt-4 text-sm">
							<div>Total</div>
							<div>Paid</div>
							<div>Pending</div>
							<div>Overdue</div>
						</div>
					</CardContent>
				</Card>
				{/* Summary Cards */}
				<div className="grid gap-4 md:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<CreditCard className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">12345</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Payments Today
							</CardTitle>
							<Calendar className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">5</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Students
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">120</div>
						</CardContent>
					</Card>
				</div>
			</TabsContent>
			<TabsContent value="details">
				<Card>
					<CardHeader>
						<CardTitle>Detailed View</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							This section would contain more detailed information and advanced
							features related to the current view.
						</p>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="reports">
				<Card>
					<CardHeader>
						<CardTitle>Reports</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							Generate and download various reports related to payments,
							students, and overall financial status.
						</p>
						<Button className="mt-4">
							<Download className="mr-2 h-4 w-4" />
							Download Report
						</Button>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
