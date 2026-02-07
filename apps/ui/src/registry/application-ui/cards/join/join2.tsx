import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, Heart, UserCircle } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
	className?: ComponentProps<"div">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const JoinCard2 = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"max-w-[300px] border border-border bg-background rounded-3xl p-4 flex flex-col items-center justify-between gap-2",
				className
			)}
		>
			<div className='w-full flex items-center justify-between gap-2'>
				<img
					src={`${registryUrl}/static/images/avatars/2.jpeg`}
					alt='avatar'
					className='rounded-full'
					width={40}
					height={40}
				/>

				<Button size={"icon"} variant={"outline"} className='rounded-xl'>
					<Heart className='h-4 w-4 opacity-70 text-foreground' />
				</Button>
			</div>

			<div className='my-2'>
				<h1 className='font-bold text-foreground'>Mboa Coders</h1>
				<p className='text-sm text-muted-foreground'>
					We are a community of developers prepping for coding interviews,
					participating to hackatons and so on
				</p>
			</div>

			<div className='w-full flex items-center justify-between gap-2'>
				<Button variant='outline' className='rounded-xl w-full'>
					<Eye className='text-foreground'></Eye>
					<span className='text-foreground'>View</span>
				</Button>
				<Button className='rounded-xl w-full'>
					<UserCircle className='text-primary-foreground' />
					<span>Join</span>
				</Button>
			</div>
		</div>
	);
};
