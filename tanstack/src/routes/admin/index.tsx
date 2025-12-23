import { createFileRoute } from "@tanstack/react-router";
import {
	Activity,
	CreditCard,
	DollarSign,
	Download,
	TrendingDown,
	TrendingUp,
	Users,
} from "lucide-react";
import { useState } from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";

export const Route = createFileRoute("/admin/")({
	component: AdminDashboard,
});

const stats = [
	{
		title: "Total Revenue",
		value: "$45,231.89",
		change: "+20.1%",
		trend: "up",
		icon: DollarSign,
		description: "from last month",
	},
	{
		title: "Subscriptions",
		value: "+2350",
		change: "+180.1%",
		trend: "up",
		icon: Users,
		description: "from last month",
	},
	{
		title: "Sales",
		value: "+12,234",
		change: "+19%",
		trend: "up",
		icon: CreditCard,
		description: "from last month",
	},
	{
		title: "Active Now",
		value: "+573",
		change: "+201",
		trend: "up",
		icon: Activity,
		description: "since last hour",
	},
];

const recentSales = [
	{
		name: "Olivia Martin",
		email: "olivia.martin@email.com",
		amount: "+$1,999.00",
		avatar: "",
		initials: "OM",
	},
	{
		name: "Jackson Lee",
		email: "jackson.lee@email.com",
		amount: "+$39.00",
		avatar: "",
		initials: "JL",
	},
	{
		name: "Isabella Nguyen",
		email: "isabella.nguyen@email.com",
		amount: "+$299.00",
		avatar: "",
		initials: "IN",
	},
	{
		name: "William Kim",
		email: "will@email.com",
		amount: "+$99.00",
		avatar: "",
		initials: "WK",
	},
	{
		name: "Sofia Davis",
		email: "sofia.davis@email.com",
		amount: "+$39.00",
		avatar: "",
		initials: "SD",
	},
];

// Simple bar chart data - months
const chartData = [
	{ month: "Jan", value: 1800 },
	{ month: "Feb", value: 3200 },
	{ month: "Mar", value: 2800 },
	{ month: "Apr", value: 3800 },
	{ month: "May", value: 3200 },
	{ month: "Jun", value: 2900 },
	{ month: "Jul", value: 5200 },
	{ month: "Aug", value: 4500 },
	{ month: "Sep", value: 3800 },
	{ month: "Oct", value: 2400 },
	{ month: "Nov", value: 4200 },
	{ month: "Dec", value: 3500 },
];

const maxValue = Math.max(...chartData.map((d) => d.value));

function AdminDashboard() {
	return (
		<div className="space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<Button>
					<Download className="mr-2 h-4 w-4" />
					Download
				</Button>
			</div>

			{/* Sub Tabs */}
			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="reports">Reports</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					{/* Stats Grid */}
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{stats.map((stat) => {
							const Icon = stat.icon;
							return (
								<Card key={stat.title}>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											{stat.title}
										</CardTitle>
										<Icon className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">{stat.value}</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-600">{stat.change}</span>{" "}
											{stat.description}
										</p>
									</CardContent>
								</Card>
							);
						})}
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						{/* Chart Overview */}
						<Card className="col-span-4">
							<CardHeader>
								<CardTitle>Overview</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								{/* Simple Bar Chart */}
								<div className="h-[350px] w-full">
									<div className="flex h-full items-end justify-between gap-2 px-4">
										{chartData.map((data) => {
											const height = (data.value / maxValue) * 100;
											return (
												<div
													key={data.month}
													className="flex flex-1 flex-col items-center gap-2"
												>
													<div className="flex w-full items-end justify-center">
														<div
															className="w-full rounded-t-sm bg-primary transition-all hover:opacity-80"
															style={{ height: `${height}%` }}
														/>
													</div>
													<span className="text-xs text-muted-foreground">
														{data.month}
													</span>
												</div>
											);
										})}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Recent Sales */}
						<Card className="col-span-3">
							<CardHeader>
								<CardTitle>Recent Sales</CardTitle>
								<CardDescription>
									You made 265 sales this month.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-8">
									{recentSales.map((sale) => (
										<div key={sale.email} className="flex items-center">
											<Avatar className="h-9 w-9">
												<AvatarImage src={sale.avatar} alt={sale.name} />
												<AvatarFallback>{sale.initials}</AvatarFallback>
											</Avatar>
											<div className="ml-4 space-y-1">
												<p className="text-sm font-medium leading-none">
													{sale.name}
												</p>
												<p className="text-sm text-muted-foreground">
													{sale.email}
												</p>
											</div>
											<div className="ml-auto font-medium">{sale.amount}</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="analytics" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Analytics</CardTitle>
							<CardDescription>
								View detailed analytics and insights
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Analytics content will be displayed here.
							</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="reports" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Reports</CardTitle>
							<CardDescription>Generate and view reports</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Reports content will be displayed here.
							</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="notifications" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Notifications</CardTitle>
							<CardDescription>Manage your notifications</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Notifications content will be displayed here.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
