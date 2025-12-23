import { createFileRoute } from "@tanstack/react-router";
import {
	Calendar,
	Edit,
	Mail,
	MoreVertical,
	Phone,
	Search,
	Shield,
	Trash,
	UserPlus,
} from "lucide-react";
import { useState } from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";

export const Route = createFileRoute("/admin/users")({
	component: UsersPage,
});

interface User {
	id: number;
	name: string;
	email: string;
	role: "admin" | "user" | "moderator";
	status: "active" | "inactive" | "pending";
	avatar?: string;
	phone?: string;
	joinedDate: string;
}

const mockUsers: User[] = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "admin",
		status: "active",
		phone: "+1 234 567 8901",
		joinedDate: "2024-01-15",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "user",
		status: "active",
		phone: "+1 234 567 8902",
		joinedDate: "2024-02-20",
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "moderator",
		status: "active",
		phone: "+1 234 567 8903",
		joinedDate: "2024-03-10",
	},
	{
		id: 4,
		name: "Alice Williams",
		email: "alice@example.com",
		role: "user",
		status: "inactive",
		phone: "+1 234 567 8904",
		joinedDate: "2024-04-05",
	},
	{
		id: 5,
		name: "Charlie Brown",
		email: "charlie@example.com",
		role: "user",
		status: "pending",
		phone: "+1 234 567 8905",
		joinedDate: "2024-12-18",
	},
];

function UsersPage() {
	const [users, setUsers] = useState<User[]>(mockUsers);
	const [searchTerm, setSearchTerm] = useState("");
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		role: "user" as User["role"],
		phone: "",
	});

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleAddUser = () => {
		const user: User = {
			id: users.length + 1,
			...newUser,
			status: "pending",
			joinedDate: new Date().toISOString().split("T")[0],
		};
		setUsers([...users, user]);
		setIsAddDialogOpen(false);
		setNewUser({ name: "", email: "", role: "user", phone: "" });
	};

	const handleDeleteUser = (id: number) => {
		setUsers(users.filter((u) => u.id !== id));
	};

	const getRoleColor = (role: User["role"]) => {
		switch (role) {
			case "admin":
				return "destructive";
			case "moderator":
				return "default";
			default:
				return "secondary";
		}
	};

	const getStatusColor = (status: User["status"]) => {
		switch (status) {
			case "active":
				return "default";
			case "inactive":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Users</h1>
					<p className="text-muted-foreground">
						Manage your users and their roles
					</p>
				</div>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<UserPlus className="mr-2 h-4 w-4" />
							Add User
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New User</DialogTitle>
							<DialogDescription>
								Create a new user account with the specified details.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									value={newUser.name}
									onChange={(e) =>
										setNewUser({ ...newUser, name: e.target.value })
									}
									placeholder="John Doe"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={newUser.email}
									onChange={(e) =>
										setNewUser({ ...newUser, email: e.target.value })
									}
									placeholder="john@example.com"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="phone">Phone</Label>
								<Input
									id="phone"
									value={newUser.phone}
									onChange={(e) =>
										setNewUser({ ...newUser, phone: e.target.value })
									}
									placeholder="+1 234 567 8901"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="role">Role</Label>
								<Select
									value={newUser.role}
									onValueChange={(value: User["role"]) =>
										setNewUser({ ...newUser, role: value })
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="user">User</SelectItem>
										<SelectItem value="moderator">Moderator</SelectItem>
										<SelectItem value="admin">Admin</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsAddDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleAddUser}>Create User</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<Shield className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{users.length}</div>
						<p className="text-xs text-muted-foreground">
							{users.filter((u) => u.status === "active").length} active
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Admins</CardTitle>
						<Shield className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{users.filter((u) => u.role === "admin").length}
						</div>
						<p className="text-xs text-muted-foreground">
							System administrators
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pending</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{users.filter((u) => u.status === "pending").length}
						</div>
						<p className="text-xs text-muted-foreground">Awaiting activation</p>
					</CardContent>
				</Card>
			</div>

			{/* Users Table */}
			<Card>
				<CardHeader>
					<CardTitle>All Users</CardTitle>
					<CardDescription>
						A list of all users in your application
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search users..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-8"
							/>
						</div>
					</div>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>User</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Phone</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Joined</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredUsers.map((user) => (
									<TableRow key={user.id}>
										<TableCell>
											<div className="flex items-center gap-3">
												<Avatar className="h-8 w-8">
													<AvatarImage src={user.avatar} />
													<AvatarFallback>
														{user.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<span className="font-medium">{user.name}</span>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Mail className="h-4 w-4 text-muted-foreground" />
												{user.email}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Phone className="h-4 w-4 text-muted-foreground" />
												{user.phone}
											</div>
										</TableCell>
										<TableCell>
											<Badge variant={getRoleColor(user.role)}>
												{user.role}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge variant={getStatusColor(user.status)}>
												{user.status}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4 text-muted-foreground" />
												{user.joinedDate}
											</div>
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<MoreVertical className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem>
														<Edit className="mr-2 h-4 w-4" />
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem>
														<Mail className="mr-2 h-4 w-4" />
														Send Email
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														className="text-destructive"
														onClick={() => handleDeleteUser(user.id)}
													>
														<Trash className="mr-2 h-4 w-4" />
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
