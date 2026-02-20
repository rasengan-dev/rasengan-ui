import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Briefcase, Edit2 } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
	className?: ComponentProps<"article">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const ProfileCard5 = ({ className }: Props) => {
	return (
		<article
			className={cn(
				"relative w-full max-w-[800px] rounded-2xl shadow-md bg-background border-[1px] border-border overflow-hidden",
				className
			)}
		>
			<div className='relative'>
				<div className='relative w-full h-46 border-b border-border flex items-center justify-between overflow-hidden'>
					<img
						src={`${registryUrl}/static/images/gradients/1.jpeg`}
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
						src={`${registryUrl}/static/images/avatars/4.jpeg`}
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

				<div className='flex items-center gap-2 mt-2'>
					<Button className='rounded-full'>Edit Profile</Button>

					<Button
						variant={"outline"}
						className='rounded-full text-foreground/70'
					>
						Follow
					</Button>
				</div>
			</div>

			<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4'>
				<div className='rounded-lg p-4 bg-input/30 flex gap-4 items-center justify-between hover:bg-input/50 transition-colors cursor-pointer'>
					<div>
						<h2 className='text-foreground font-medium text-sm'>
							Ready for work
						</h2>
						<p className='text-foreground/60 text-[12px]'>
							Show recruiters that you're ready for work
						</p>
					</div>

					<Button
						size='icon'
						variant={"outline"}
						className='text-foreground/70 rounded-full shrink-0'
					>
						<ArrowRight />
					</Button>
				</div>

				<div className='rounded-lg p-4 bg-input/30 flex gap-4 items-center justify-between hover:bg-input/50 transition-colors cursor-pointer'>
					<div>
						<h2 className='text-foreground font-medium text-sm'>Share posts</h2>
						<p className='text-foreground/60 text-[12px]'>
							Share latest news to get connected with others
						</p>
					</div>

					<Button
						size='icon'
						variant={"outline"}
						className='text-foreground/70 rounded-full shrink-0'
					>
						<ArrowRight />
					</Button>
				</div>

				<div className='rounded-lg p-4 bg-input/30 flex gap-4 items-center justify-between hover:bg-input/50 transition-colors cursor-pointer'>
					<div>
						<h2 className='text-foreground font-medium text-sm'>Update</h2>
						<p className='text-foreground/60 text-[12px]'>
							Keep your profile updated so that recruiters know you better
						</p>
					</div>

					<Button
						size='icon'
						variant={"outline"}
						className='text-foreground/70 rounded-full shrink-0'
					>
						<ArrowRight />
					</Button>
				</div>
			</div>
		</article>
	);
};
