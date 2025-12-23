import { createFileRoute } from "@tanstack/react-router";
import {
	Bell,
	Globe,
	Lock,
	Mail,
	Palette,
	Save,
	Shield,
	Users,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Switch } from "../../components/ui/switch";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";

export const Route = createFileRoute("/admin/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	const [settings, setSettings] = useState({
		// General Settings
		siteName: "My Admin Panel",
		siteDescription: "A modern admin dashboard",
		timezone: "UTC",
		language: "en",

		// Email Settings
		emailFrom: "noreply@example.com",
		smtpHost: "smtp.example.com",
		smtpPort: "587",

		// Notification Settings
		emailNotifications: true,
		pushNotifications: false,
		smsNotifications: false,

		// Security Settings
		twoFactorAuth: true,
		sessionTimeout: "30",
		passwordExpiry: "90",

		// Appearance
		theme: "light",
		primaryColor: "#0ea5e9",
	});

	const handleSave = () => {
		console.log("Settings saved:", settings);
		// TODO: Implement actual save functionality
	};

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
					<p className="text-muted-foreground">
						Manage your application settings and preferences
					</p>
				</div>
				<Button onClick={handleSave}>
					<Save className="mr-2 h-4 w-4" />
					Save Changes
				</Button>
			</div>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">
						<Globe className="mr-2 h-4 w-4" />
						General
					</TabsTrigger>
					<TabsTrigger value="notifications">
						<Bell className="mr-2 h-4 w-4" />
						Notifications
					</TabsTrigger>
					<TabsTrigger value="security">
						<Shield className="mr-2 h-4 w-4" />
						Security
					</TabsTrigger>
					<TabsTrigger value="appearance">
						<Palette className="mr-2 h-4 w-4" />
						Appearance
					</TabsTrigger>
				</TabsList>

				{/* General Settings */}
				<TabsContent value="general" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>General Settings</CardTitle>
							<CardDescription>
								Configure basic application settings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="siteName">Site Name</Label>
								<Input
									id="siteName"
									value={settings.siteName}
									onChange={(e) =>
										setSettings({ ...settings, siteName: e.target.value })
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="siteDescription">Site Description</Label>
								<Textarea
									id="siteDescription"
									value={settings.siteDescription}
									onChange={(e) =>
										setSettings({
											...settings,
											siteDescription: e.target.value,
										})
									}
									rows={3}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="timezone">Timezone</Label>
								<Select
									value={settings.timezone}
									onValueChange={(value) =>
										setSettings({ ...settings, timezone: value })
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="UTC">UTC</SelectItem>
										<SelectItem value="America/New_York">
											Eastern Time (ET)
										</SelectItem>
										<SelectItem value="America/Chicago">
											Central Time (CT)
										</SelectItem>
										<SelectItem value="America/Los_Angeles">
											Pacific Time (PT)
										</SelectItem>
										<SelectItem value="Europe/London">London (GMT)</SelectItem>
										<SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="language">Language</Label>
								<Select
									value={settings.language}
									onValueChange={(value) =>
										setSettings({ ...settings, language: value })
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="en">English</SelectItem>
										<SelectItem value="vi">Tiếng Việt</SelectItem>
										<SelectItem value="es">Español</SelectItem>
										<SelectItem value="fr">Français</SelectItem>
										<SelectItem value="de">Deutsch</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Email Configuration</CardTitle>
							<CardDescription>
								SMTP settings for outgoing emails
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="emailFrom">From Email</Label>
								<Input
									id="emailFrom"
									type="email"
									value={settings.emailFrom}
									onChange={(e) =>
										setSettings({ ...settings, emailFrom: e.target.value })
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="smtpHost">SMTP Host</Label>
								<Input
									id="smtpHost"
									value={settings.smtpHost}
									onChange={(e) =>
										setSettings({ ...settings, smtpHost: e.target.value })
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="smtpPort">SMTP Port</Label>
								<Input
									id="smtpPort"
									value={settings.smtpPort}
									onChange={(e) =>
										setSettings({ ...settings, smtpPort: e.target.value })
									}
								/>
							</div>
							<Button variant="outline">
								<Mail className="mr-2 h-4 w-4" />
								Test Email Connection
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Notifications Settings */}
				<TabsContent value="notifications" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Notification Preferences</CardTitle>
							<CardDescription>
								Choose how you want to receive notifications
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="emailNotifications">
										Email Notifications
									</Label>
									<p className="text-sm text-muted-foreground">
										Receive notifications via email
									</p>
								</div>
								<Switch
									id="emailNotifications"
									checked={settings.emailNotifications}
									onCheckedChange={(checked) =>
										setSettings({ ...settings, emailNotifications: checked })
									}
								/>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="pushNotifications">Push Notifications</Label>
									<p className="text-sm text-muted-foreground">
										Receive browser push notifications
									</p>
								</div>
								<Switch
									id="pushNotifications"
									checked={settings.pushNotifications}
									onCheckedChange={(checked) =>
										setSettings({ ...settings, pushNotifications: checked })
									}
								/>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="smsNotifications">SMS Notifications</Label>
									<p className="text-sm text-muted-foreground">
										Receive notifications via SMS
									</p>
								</div>
								<Switch
									id="smsNotifications"
									checked={settings.smsNotifications}
									onCheckedChange={(checked) =>
										setSettings({ ...settings, smsNotifications: checked })
									}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Security Settings */}
				<TabsContent value="security" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Security Settings</CardTitle>
							<CardDescription>
								Manage security and authentication settings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<div className="flex items-center gap-2">
										<Label htmlFor="twoFactorAuth">
											Two-Factor Authentication
										</Label>
										<Badge variant="default">Recommended</Badge>
									</div>
									<p className="text-sm text-muted-foreground">
										Add an extra layer of security to your account
									</p>
								</div>
								<Switch
									id="twoFactorAuth"
									checked={settings.twoFactorAuth}
									onCheckedChange={(checked) =>
										setSettings({ ...settings, twoFactorAuth: checked })
									}
								/>
							</div>
							<Separator />
							<div className="grid gap-2">
								<Label htmlFor="sessionTimeout">
									Session Timeout (minutes)
								</Label>
								<Input
									id="sessionTimeout"
									type="number"
									value={settings.sessionTimeout}
									onChange={(e) =>
										setSettings({ ...settings, sessionTimeout: e.target.value })
									}
								/>
								<p className="text-sm text-muted-foreground">
									Users will be logged out after this period of inactivity
								</p>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
								<Input
									id="passwordExpiry"
									type="number"
									value={settings.passwordExpiry}
									onChange={(e) =>
										setSettings({ ...settings, passwordExpiry: e.target.value })
									}
								/>
								<p className="text-sm text-muted-foreground">
									Users must change their password after this period
								</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Appearance Settings */}
				<TabsContent value="appearance" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Appearance Settings</CardTitle>
							<CardDescription>
								Customize the look and feel of your dashboard
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="theme">Theme</Label>
								<Select
									value={settings.theme}
									onValueChange={(value) =>
										setSettings({ ...settings, theme: value })
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
										<SelectItem value="system">System</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="primaryColor">Primary Color</Label>
								<div className="flex gap-2">
									<Input
										id="primaryColor"
										type="color"
										value={settings.primaryColor}
										onChange={(e) =>
											setSettings({ ...settings, primaryColor: e.target.value })
										}
										className="w-20 h-10"
									/>
									<Input
										value={settings.primaryColor}
										onChange={(e) =>
											setSettings({ ...settings, primaryColor: e.target.value })
										}
										className="flex-1"
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
