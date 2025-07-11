import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authProvider } from "@/provider/data/auth";
import { useAuthStore } from "@/store/auth";
import Image from "@rasenganjs/image";
import { useTheme } from "@rasenganjs/theme";
import { Loader, LogOut, User } from "lucide-react";
import { useNavigate } from "rasengan";
import { useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

type Props = {
	children: React.ReactNode;
};

export default function ProfileDropdown({ children }: Props) {
	const { theme } = useTheme();

	const { user, setUser } = useAuthStore();
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleLogout = async () => {
		setLoading(true);
		await authProvider.logout();
		setLoading(false);

		setUser(null);
		toast.success("Logged out successfully");

		navigate("/");
	};

	if (!user) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='w-full'>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				className={twMerge("min-w-[200px] mr-4", theme === "dark" && "dark")}
			>
				<div className='flex items-center gap-2 p-1'>
					<Image
						src={user.avatar || ""}
						alt='avatar'
						className='w-[32px] h-[32px] rounded-full'
						width={32}
						height={32}
					/>
					<div className='flex flex-col font-raleway font-medium'>
						<span>{user.name}</span>
					</div>
				</div>
				<DropdownMenuLabel className='font-raleway'>
					My Account
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className='font-raleway'>
						<User />
						Profile
					</DropdownMenuItem>

					<DropdownMenuItem className='font-raleway' onClick={handleLogout}>
						{loading ? <Loader className='animate-spin' /> : <LogOut />}
						{loading ? "Logging out..." : "Log out"}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
