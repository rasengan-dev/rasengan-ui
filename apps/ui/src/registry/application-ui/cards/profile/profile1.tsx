import { Button } from "@/components/ui/button";
import { Bookmark, Star } from "lucide-react";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const ProfileCard1 = () => {
	return (
		<article className='w-full max-w-[280px] rounded-3xl p-1 shadow-md bg-background dark:bg-input/70'>
			<div className='relative'>
				<img
					src={`${registryUrl}/static/images/bg/2.jpeg`}
					alt='Avatar'
					className='rounded-2xl'
					width={"100%"}
					height={150}
				/>

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

			<div className='mt-4 p-2'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-foreground font-medium'>Dilane Kombou</h2>
						<span className='text-foreground font-light text-[12px]'>
							Frontend Developer
						</span>
					</div>

					<Button size={"icon"} variant={"outline"} className='rounded-xl'>
						<Bookmark className='h-4 w-4 opacity-70 text-foreground' />
					</Button>
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

						<span className='text-[12px] text-foreground mr-1'>
							Rasengan.js Expert
						</span>
					</div>
					<div className='flex items-center gap-1 mt-2 w-auto bg-transparent border-[1px] border-border px-2 py-1 rounded-full'>
						<span className='text-[12px] mr-1 text-foreground'>+6</span>
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

				<div className='w-full mt-4'>
					<Button className='w-full rounded-3xl'>
						<span>Follow</span>
					</Button>
				</div>
			</div>
		</article>
	);
};
