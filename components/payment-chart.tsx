"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartConfig = {
	count: {
		label: "Count",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function PaymentChart({
	data,
}: { data: { month: string; count: number }[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment Analytics</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer className="min-h-[200px]" config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Area
							dataKey="count"
							type="natural"
							fill="var(--color-count)"
							fillOpacity={0.4}
							stroke="var(--color-count)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
