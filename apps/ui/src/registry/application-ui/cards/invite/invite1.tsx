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
import { Copy, Mail, UserRoundPlus } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
	className?: ComponentProps<"div">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const InviteCard1 = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"max-w-[500px] w-full min-h-[400px] border border-border bg-background rounded-3xl p-4 gap-8",
				className
			)}
		>
			<div className='w-full border-b-[1px] border-b-border border-dashed py-4 flex items-center gap-4'>
				<div className='size-16 shrink-0 bg-muted rounded-full flex items-center justify-center border border-border border-dashed'>
					<UserRoundPlus className='text-muted-foreground' />
				</div>
				<div>
					<h2 className='text-foreground font-bold'>Invite to your website</h2>
					<p className='text-muted-foreground text-sm'>
						Collaborate with members to see website
					</p>
				</div>
			</div>

			<div className='rounded-lg p-4 bg-[#F5F6F8] dark:bg-muted mt-4'>
				<div className='flex flex-col sm:flex-row items-center justify-between gap-4 border-b-[1px] border-b-border pb-4'>
					<div className='w-full xs:w-auto'>
						<h1 className='text-foreground font-bold'>Link to Share</h1>
						<p className='text-muted-foreground text-sm'>
							Anyone with the link can access
						</p>
					</div>

					<Select value='all'>
						<SelectTrigger className='w-full sm:w-[140px] bg-background dark:bg-primary border-none text-[12px]'>
							<SelectValue placeholder='Permission' className='font-medium' />
						</SelectTrigger>
						<SelectContent className='text-[12px]'>
							<SelectItem value='all' className='text-[12px]'>
								Anyone with link
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className='mt-4 flex items-center gap-2'>
					<Input
						value='https://rasengan.dev/docs'
						className='bg-background dark:bg-primary border-none text-[12px]'
						disabled
					/>
					<Button className='bg-white hover:bg-primary/10 dark:hover:bg-primary/80'>
						<Copy className='w-4 h-4 text-foreground dark:text-primary-foreground' />
						<span className='text-foreground dark:text-primary-foreground text-[12px]'>
							Copy
						</span>
					</Button>
				</div>
			</div>

			<div className='mt-4'>
				<label htmlFor='email' className='font-medium text-foreground text-sm'>
					Email
				</label>
				<div className='w-full relative flex items-center gap-2'>
					<Input
						placeholder='hello@dilane3.dev'
						className='bg-background dark:bg-primary pl-10'
					/>

					<Button className='text-[12px]'>Send Invite</Button>

					<span className='absolute left-3 top-1/2 -translate-y-1/2'>
						<Mail className='w-4 h-4 text-muted-foreground' />
					</span>
				</div>
			</div>

			<div className='mt-4'>
				<h2 className='font-medium text-foreground text-sm'>Member List</h2>
				<div className='w-full relative flex flex-col items-center gap-2 mt-4'>
					<article className='w-full py-2 flex items-center justify-between gap-4'>
						<div className='flex items-center gap-2'>
							<img
								src={`${registryUrl}/static/images/avatars/1.jpeg`}
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
							<img
								src={`${registryUrl}/static/images/avatars/2.jpeg`}
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
							<img
								src={`${registryUrl}/static/images/avatars/3.jpeg`}
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
							<img
								src={`${registryUrl}/static/images/avatars/4.jpeg`}
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
		</div>
	);
};
