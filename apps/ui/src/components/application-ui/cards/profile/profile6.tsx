import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Edit2, Ellipsis, UserPlus } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	className?: ComponentProps<"article">["className"];
};

export const ProfileCard6 = ({ className }: Props) => {
	return (
		<article
			className={twMerge(
				"relative w-full max-w-[800px] rounded-2xl shadow-md bg-background border-[1px] border-border overflow-hidden",
				className
			)}
		>
			<div className='relative'>
				<div className='relative w-full h-46 border-b border-border flex items-center justify-between overflow-hidden'>
					<img
						src='/static/images/gradients/2.jpeg'
						alt='Gradient'
						width={"100%"}
						height={"100%"}
						className='object-cover'
					/>

					<div className='absolute right-4 top-4'>
						<Button
							size='icon'
							variant={"ghost"}
							className='rounded-full bg-background text-foreground'
						>
							<Edit2 />
						</Button>
					</div>
				</div>

				<div className='absolute -bottom-[75px] left-4'>
					<img
						src='/static/images/avatars/4.jpeg'
						alt='Avatar'
						width={"130px"}
						height={"130px"}
						className='object-cover rounded-full border-[10px] border-background'
					/>
				</div>
			</div>

			<div className='w-full flex flex-col gap-2 p-4'>
				<div className='flex justify-between'>
					<div className='mt-[60px]'>
						<h2 className='text-foreground text-2xl font-bold'>
							Dilane Kombou
						</h2>

						<div className='flex flex-col mt-1'>
							<span className='text-foreground/70 font-medium text-sm'>
								Frontend Developer
							</span>

							<span className='text-foreground/70 font-medium text-sm'>
								Yaoundé, Cameroon
							</span>
						</div>
					</div>

					<div>
						<div className='flex items-center gap-2 text-foreground/70 '>
							<span>
								<Briefcase size={16} />
							</span>
							<span className='font-medium text-sm'>Rasengan Labs</span>
						</div>

						<Badge variant={"outline"} className='mt-2'>
							CEO, Founder
						</Badge>
					</div>
				</div>

				<div className='flex items-center gap-4 mt-2'>
					<div className='flex items-center gap-1 text-foreground'>
						<span className='font-medium text-lg'>892</span>
						<span className='text-sm'>Followers</span>
					</div>

					<div className='flex items-center gap-1 text-foreground'>
						<span className='font-medium text-lg'>576</span>
						<span className='text-sm'>Connections</span>
					</div>
				</div>

				<div className='flex items-center gap-2 mt-2'>
					<Button className='rounded-lg'>
						<UserPlus />
						<span>Follow</span>
					</Button>

					<Button variant={"outline"} className='rounded-lg text-foreground/70'>
						<Ellipsis />
						<span>More</span>
					</Button>
				</div>
			</div>
		</article>
	);
};
