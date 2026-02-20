import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
	className?: ComponentProps<"div">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const JoinCard1 = ({ className }: Props) => {
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

				<div className='flex justify-end items-center relative bg-muted w-[100px] h-8 rounded-full py-1 px-3 text-foreground'>
					<div className='absolute left-0 top-1/2 -translate-y-1/2 z-10'>
						<img
							src={`${registryUrl}/static/images/avatars/5.jpeg`}
							alt='avatar'
							className='rounded-full'
							width={25}
							height={25}
						/>
					</div>
					<div className='absolute left-4 top-1/2 -translate-y-1/2 z-8'>
						<img
							src={`${registryUrl}/static/images/avatars/3.jpeg`}
							alt='avatar'
							className='rounded-full'
							width={25}
							height={25}
						/>
					</div>
					<div className='absolute left-8 top-1/2 -translate-y-1/2 z-6'>
						<img
							src={`${registryUrl}/static/images/avatars/6.jpeg`}
							alt='avatar'
							className='rounded-full'
							width={25}
							height={25}
						/>
					</div>

					<span className='text-[12px] font-medium'>+4k</span>
				</div>
			</div>

			<div className='my-2'>
				<h1 className='font-bold text-foreground'>Mboa Coders</h1>
				<p className='text-sm text-muted-foreground'>
					We are a community of developers prepping for coding interviews,
					participating to hackatons and so on
				</p>
			</div>

			<div className='w-full flex items-center justify-between gap-2'>
				<Button size={"icon"} variant={"outline"} className='rounded-xl'>
					<Heart className='h-4 w-4 opacity-70 text-foreground' />
				</Button>

				<div className='flex items-center gap-2'>
					<Button variant='outline' className='rounded-xl text-foreground'>
						View
					</Button>
					<Button className='rounded-xl'>Join</Button>
				</div>
			</div>
		</div>
	);
};
