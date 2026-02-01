import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Grid2X2, List, XCircle } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
	className?: ComponentProps<"div">["className"];
};

export const DashboardFilter = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"w-full max-w-[700px] min-h-[100px] h-auto rounded-xl p-3 bg-background dark:bg-input/70 border border-border",
				className
			)}
		>
			<div className='flex items-center justify-between gap-2'>
				<h1 className='text-lg font-medium text-foreground'>Funnels</h1>
				<div className='flex items-center gap-2'>
					<div className='flex md:hidden items-center gap-2'>
						<Button size='icon' variant='ghost'>
							<List size={16} className='text-foreground' />
						</Button>

						<Button size='icon' variant='ghost'>
							<Grid2X2 size={16} className='text-foreground' />
						</Button>
					</div>
					<Button>Create a funnel</Button>
				</div>
			</div>

			<div className='flex items-center justify-between gap-2 mt-4'>
				<div className='flex items-center flex-wrap gap-2'>
					<Input
						placeholder='Search by name or link'
						className='w-full sm:w-[200px] text-foreground'
					/>

					<Select>
						<SelectTrigger className='w-full sm:w-[120px] text-foreground'>
							<SelectValue placeholder='Filter by status' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>All Status</SelectItem>
							<SelectItem value='completed'>Completed</SelectItem>
							<SelectItem value='pending'>Pending</SelectItem>
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className='w-full sm:w-[120px] text-foreground'>
							<SelectValue placeholder='Filter by tag' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>All Tags</SelectItem>
							<SelectItem value='link'>Link</SelectItem>
							<SelectItem value='email'>Email</SelectItem>
						</SelectContent>
					</Select>

					<Button variant='ghost' className='flex items-center gap-2'>
						<XCircle className='text-red-400 dark:text-red-200' />
						<span className='text-foreground/70'>Reset</span>
					</Button>
				</div>

				<div className='items-center gap-2 hidden md:flex'>
					<Button size='icon' variant='ghost'>
						<List size={16} className='text-foreground' />
					</Button>

					<Button size='icon' variant='ghost'>
						<Grid2X2 size={16} className='text-foreground' />
					</Button>
				</div>
			</div>
		</div>
	);
};
