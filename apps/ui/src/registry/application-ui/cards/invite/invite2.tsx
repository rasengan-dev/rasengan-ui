import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Info, UserRoundPlus } from "lucide-react";
import Image from "@rasenganjs/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
	className?: ComponentProps<"div">["className"];
};

export const InviteCard2 = ({ className }: Props) => {
	return (
		<div
			className={twMerge(
				"max-w-[500px] w-full min-h-[400px] border border-border bg-background rounded-3xl p-4 gap-8",
				className
			)}
		>
			<div className='w-full border-b-[1px] border-b-border border-dashed py-4 flex items-center gap-4'>
				<div className='size-12 shrink-0 rounded-full flex items-center justify-center border border-border border-dashed'>
					<UserRoundPlus className='text-muted-foreground' />
				</div>
				<div>
					<h2 className='text-foreground font-bold'>Invite to project</h2>
					<p className='text-muted-foreground text-sm'>
						Collaborate with members to this project
					</p>
				</div>
			</div>

			<div className='mt-4'>
				<div className='w-full relative flex items-center gap-2'>
					<label
						htmlFor='email'
						className='font-medium text-foreground text-sm'
					>
						Invite Members
					</label>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Info className='text-foreground' size={14} />
							</TooltipTrigger>
							<TooltipContent>
								<p>Members can have access to this project.</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className='w-full relative flex items-center gap-2 mt-2'>
					<div className='w-full relative'>
						<Input
							placeholder='Email address...'
							className='bg-background dark:bg-primary pr-30'
						/>

						<div className='absolute right-0 top-1/2 -translate-y-1/2'>
							<Select>
								<SelectTrigger className='w-auto h-[30px] border-none bg-background dark:bg-transparent text-[12px] rounded-full gap-2 outline-0 focus:outline-0'>
									<SelectValue placeholder='Role' className='font-medium' />
								</SelectTrigger>
								<SelectContent className='text-[12px]'>
									<SelectItem value='owner' className='text-[12px]'>
										Owner
									</SelectItem>
									<SelectItem value='view' className='text-[12px]'>
										Can View
									</SelectItem>
									<SelectItem value='edit' className='text-[12px]'>
										Can Edit
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<Button className='text-[12px]'>Send Invite</Button>
				</div>
			</div>

			<div className='mt-4 border-b-[1px] border-b-border border-dashed'>
				<h2 className='font-medium text-foreground text-sm'>
					Members with access
				</h2>
				<div className='w-full relative flex flex-col items-center gap-2 mt-2'>
					<article className='w-full py-2 flex items-center justify-between gap-4'>
						<div className='flex items-center gap-2'>
							<Image
								src='/static/images/avatars/1.jpeg'
								alt='Avatar'
								className='rounded-full bg-primary/20 flex items-center justify-center'
								width={40}
								height={40}
							/>

							<div className='flex flex-col'>
								<h2 className='font-medium text-foreground text-sm'>Dilane3</h2>
								<p className='text-muted-foreground text-[12px]'>
									dilane3@gmail.com
								</p>
							</div>
						</div>

						<Select value='owner'>
							<SelectTrigger className='w-auto h-[30px] bg-background dark:bg-primary text-[12px] rounded-full gap-2'>
								<SelectValue placeholder='Role' className='font-medium' />
							</SelectTrigger>
							<SelectContent className='text-[12px]'>
								<SelectItem value='owner' className='text-[12px]'>
									Owner
								</SelectItem>
								<SelectItem value='view' className='text-[12px]'>
									Can View
								</SelectItem>
								<SelectItem value='edit' className='text-[12px]'>
									Can Edit
								</SelectItem>
							</SelectContent>
						</Select>
					</article>
					<article className='w-full py-2 flex items-center justify-between gap-4'>
						<div className='flex items-center gap-2'>
							<Image
								src='/static/images/avatars/2.jpeg'
								alt='Avatar'
								className='rounded-full bg-primary/20 flex items-center justify-center'
								width={40}
								height={40}
							/>

							<div className='flex flex-col'>
								<h2 className='font-medium text-foreground text-sm'>Kento</h2>
								<p className='text-muted-foreground text-[12px]'>
									kento@gmail.com
								</p>
							</div>
						</div>

						<Select value='view'>
							<SelectTrigger className='w-auto h-[30px] bg-background dark:bg-primary text-[12px] rounded-full gap-2'>
								<SelectValue placeholder='Role' className='font-medium' />
							</SelectTrigger>
							<SelectContent className='text-[12px]'>
								<SelectItem value='owner' className='text-[12px]'>
									Owner
								</SelectItem>
								<SelectItem value='view' className='text-[12px]'>
									Can View
								</SelectItem>
								<SelectItem value='edit' className='text-[12px]'>
									Can Edit
								</SelectItem>
							</SelectContent>
						</Select>
					</article>
					<article className='w-full py-2 flex items-center justify-between gap-4'>
						<div className='flex items-center gap-2'>
							<Image
								src='/static/images/avatars/3.jpeg'
								alt='Avatar'
								className='rounded-full bg-primary/20 flex items-center justify-center'
								width={40}
								height={40}
							/>

							<div className='flex flex-col'>
								<h2 className='font-medium text-foreground text-sm'>Kakashi</h2>
								<p className='text-muted-foreground text-[12px]'>
									kakashi@gmail.com
								</p>
							</div>
						</div>

						<Select value='edit'>
							<SelectTrigger className='w-auto h-[30px] bg-background dark:bg-primary text-[12px] rounded-full gap-2'>
								<SelectValue placeholder='Role' className='font-medium' />
							</SelectTrigger>
							<SelectContent className='text-[12px]'>
								<SelectItem value='owner' className='text-[12px]'>
									Owner
								</SelectItem>
								<SelectItem value='view' className='text-[12px]'>
									Can View
								</SelectItem>
								<SelectItem value='edit' className='text-[12px]'>
									Can Edit
								</SelectItem>
							</SelectContent>
						</Select>
					</article>
					<article className='w-full py-2 flex items-center justify-between gap-4'>
						<div className='flex items-center gap-2'>
							<Image
								src='/static/images/avatars/4.jpeg'
								alt='Avatar'
								className='rounded-full bg-primary/20 flex items-center justify-center'
								width={40}
								height={40}
							/>

							<div className='flex flex-col'>
								<h2 className='font-medium text-foreground text-sm'>Minato</h2>
								<p className='text-muted-foreground text-[12px]'>
									minato@gmail.com
								</p>
							</div>
						</div>

						<Select value='edit'>
							<SelectTrigger className='w-auto h-[30px] bg-background dark:bg-primary text-[12px] rounded-full gap-2'>
								<SelectValue placeholder='Role' className='font-medium' />
							</SelectTrigger>
							<SelectContent className='text-[12px]'>
								<SelectItem value='owner' className='text-[12px]'>
									Owner
								</SelectItem>
								<SelectItem value='view' className='text-[12px]'>
									Can View
								</SelectItem>
								<SelectItem value='edit' className='text-[12px]'>
									Can Edit
								</SelectItem>
							</SelectContent>
						</Select>
					</article>
				</div>
			</div>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger className='w-full'>
						<div className='w-full pt-4 flex items-center gap-4 cursor-pointer'>
							<div className='size-12 shrink-0 rounded-full flex items-center justify-center border border-border border-dashed'>
								<ExternalLink className='text-muted-foreground' />
							</div>
							<div className='flex flex-col items-start'>
								<h2 className='text-foreground font-bold'>Members with link</h2>
								<p className='text-muted-foreground text-sm text-start'>
									Person with this link can only view the project.
								</p>
							</div>
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>Click to copy link</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};
