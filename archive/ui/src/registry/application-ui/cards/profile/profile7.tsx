import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2, UserPlus } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
	className?: ComponentProps<"article">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const ProfileCard7 = ({ className }: Props) => {
	return (
		<article
			className={cn(
				"relative w-full max-w-[600px] rounded-2xl shadow-md bg-background border-[1px] border-border overflow-hidden",
				className
			)}
		>
			<div className='relative'>
				<div className='relative w-full h-46 border-b border-border flex items-center justify-between overflow-hidden'>
					<img
						src={`${registryUrl}/static/images/gradients/3.jpeg`}
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

				<div className='absolute -bottom-[75px] left-1/2 -translate-x-1/2'>
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
				<div className='flex justify-center'>
					<div className='mt-[60px] flex flex-col items-center'>
						<span className='text-foreground/70 font-medium text-sm'>
							@dilane3
						</span>
						<h2 className='text-foreground text-2xl font-bold mt-1'>
							Dilane Kombou
						</h2>

						<div className='flex flex-col items-center mt-1'>
							<span className='text-foreground/70 font-medium text-sm text-center'>
								Frontend Developer and creator of Rasengan.js
							</span>

							<span className='text-foreground/70 font-medium text-sm'>
								Yaoundé, Cameroon
							</span>
						</div>
					</div>
				</div>

				<div className='flex items-center justify-center gap-2 mt-2'>
					<Button className='rounded-lg'>
						<UserPlus />
						<span>Subscribe</span>
					</Button>

					<Button variant={"outline"} className='rounded-lg text-foreground/70'>
						<Edit2 />
						<span>Edit Profile</span>
					</Button>
				</div>
			</div>
		</article>
	);
};
