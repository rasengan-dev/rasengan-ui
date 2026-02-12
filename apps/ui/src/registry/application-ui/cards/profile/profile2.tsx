import { Button } from "@/components/ui/button";
import { Bookmark, Star } from "lucide-react";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const ProfileCard2 = () => {
	return (
		<article className='relative w-full max-w-[280px] rounded-2xl p-2 shadow-md bg-background dark:bg-input/70'>
			<div className='absolute inset-1'>
				<img
					src={`${registryUrl}/static/images/bg/2.jpeg`}
					alt='Avatar'
					className='rounded-2xl h-full w-full object-cover'
				/>

				<div className='absolute inset-x-0 bottom-0 h-[60%] z-10 rounded-2xl bg-gradient-to-t from-black/60 from-30% to-transparent to-80% backdrop-blur-md backdrop-opacity-90'></div>
			</div>

			<div className='relative h-[150px] z-30'>
				<div className='absolute -bottom-4 left-2'>
					<img
						src={`${registryUrl}/static/images/avatars/3.jpeg`}
						alt='Avatar'
						className='rounded-full'
						width={60}
						height={60}
					/>
				</div>
			</div>

			<div className='relative mt-4 p-2 z-30 dark'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-foreground font-medium'>Dilane Kombou</h2>
						<span className='text-foreground font-light text-[12px]'>
							Frontend Developer
						</span>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-1 mt-2 w-auto bg-muted px-1 py-1 rounded-full'>
						<img
							src={`${registryUrl}/rasengan.svg`}
							alt='Avatar'
							className='rounded-full'
							width={24}
							height={24}
						/>

						<span className='text-[12px] mr-1 text-foreground/70'>
							Rasengan.js Expert
						</span>
					</div>
					<div className='flex items-center gap-1 mt-2 w-auto bg-transparent border-[1px] border-border dark:border-foreground/70 px-2 py-1 rounded-full'>
						<span className='text-[12px] mr-1 text-foreground/70'>+6</span>
					</div>
				</div>

				<div className='w-full mt-4 px-4 grid grid-cols-3 gap-2'>
					<div className='flex flex-col items-center'>
						<div className='text-foreground text-sm flex items-center gap-1'>
							<Star size={14} />
							<span className='font-medium'>4.9</span>
						</div>
						<span className='text-[12px] text-muted-foreground'>rating</span>
					</div>

					<div className='flex flex-col items-center'>
						<div className='text-foreground text-sm flex items-center gap-1'>
							{/* <Star size={14} /> */}
							<span className='font-medium'>$3.5k+</span>
						</div>
						<span className='text-[12px] text-muted-foreground'>earned</span>
					</div>

					<div className='flex flex-col items-center'>
						<div className='text-foreground text-sm flex items-center gap-1'>
							{/* <Star size={14} /> */}
							<span className='font-medium'>$45/hr</span>
						</div>
						<span className='text-[12px] text-muted-foreground'>rate</span>
					</div>
				</div>

				<div className='w-full mt-4 flex items-center justify-between gap-2'>
					<Button
						variant={"outline"}
						className='rounded-full bg-transparent border-[1px] border-border dark:border-foreground/60'
					>
						<Bookmark className='h-4 w-4 opacity-70 text-foreground' />
					</Button>

					<Button className='w-full rounded-3xl'>
						<span>Follow</span>
					</Button>
				</div>
			</div>
		</article>
	);
};
