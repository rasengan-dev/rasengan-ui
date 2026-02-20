import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Globe2,
	Heart,
	LocationEdit,
	Upload,
	UserCircle,
	Users,
} from "lucide-react";
import { ComponentProps } from "react";

type Props = {
	className?: ComponentProps<"div">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const JoinCard3 = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"max-w-[300px] border border-border bg-background rounded-3xl p-4 flex flex-col items-center justify-between gap-2",
				className
			)}
		>
			<div className='w-full flex items-center justify-start gap-2'>
				<img
					src={`${registryUrl}/static/images/avatars/2.jpeg`}
					alt='avatar'
					className='rounded-full'
					width={40}
					height={40}
				/>
				<h1 className='font-bold text-foreground'>Mboa Coders</h1>
			</div>

			<div className='my-2 border-b-[1px] border-b-border border-dashed pb-4'>
				<p className='text-sm text-muted-foreground'>
					We are a community of developers prepping for coding interviews,
					participating to hackatons and so on
				</p>

				<div className='flex items-center gap-2 text-foreground'>
					<div className='py-1 px-2 rounded-md bg-muted flex items-center gap-2'>
						<LocationEdit size={14} className='opacity-60' />
						<span className='text-[12px]'>Yde, CMR</span>
					</div>
					<div className='py-1 px-2 rounded-md bg-muted flex items-center gap-2'>
						<Globe2 size={14} className='opacity-60' />
						<span className='text-[12px]'>Public</span>
					</div>
					<div className='py-1 px-2 rounded-md bg-muted flex items-center gap-2'>
						<Users size={14} className='opacity-60' />
						<span className='text-[12px]'>2.5k</span>
					</div>
				</div>
			</div>

			<div className='w-full flex items-center justify-between gap-2'>
				<div className='flex items-center gap-2'>
					<Button size={"icon"} variant={"outline"} className='rounded-xl'>
						<Heart className='h-4 w-4 opacity-70 text-foreground' />
					</Button>
					<Button size={"icon"} variant={"outline"} className='rounded-xl'>
						<Upload className='h-4 w-4 opacity-70 text-foreground' />
					</Button>
				</div>

				<div className='flex items-center gap-2'>
					<Button className='rounded-xl'>
						{" "}
						<UserCircle />
						<span>Join group</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
