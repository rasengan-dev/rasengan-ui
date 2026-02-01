import Image from "@rasenganjs/image";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
	className?: ComponentProps<"article">["className"];
};

export const BookingCard2 = ({ className }: Props) => {
	return (
		<article
			className={twMerge(
				"w-full max-w-[300px] rounded-3xl border border-border bg-background dark:bg-input/40 overflow-hidden p-6",
				className
			)}
		>
			<div className='flex justify-between items-center'>
				<div className='rounded-full border-[1px] border-border p-1'>
					<Image
						src='/rasengan.svg'
						alt='Rasengan Logo'
						width={40}
						height={40}
					/>
				</div>

				<Button variant='outline' className='text-foreground text-[12px]'>
					<span>Save</span>
					<Bookmark />
				</Button>
			</div>

			<div className='min-h-[200px] mt-4 border-b-[1px] border-b-border'>
				<div className=''>
					<span className='text-sm text-foreground font-medium'>
						Rasengan Labs
					</span>
					<span className='text-[12px] text-foreground/70 ml-2'>
						5 days ago
					</span>
				</div>

				<div>
					<h2 className='text-xl font-bold text-foreground'>React Developer</h2>
					<div className='flex flex-wrap gap-2 mt-2'>
						<Badge variant={"outline"}>Contract</Badge>
						<Badge variant={"outline"}>Remote</Badge>
					</div>
				</div>
			</div>

			<div className='mt-6 flex items-center justify-between'>
				<div className='text-foreground'>
					<p className='text-sm font-bold'>$65/hr</p>
					<span className='text-foreground/70 text-[12px]'>
						Yaoundé - Cameroon
					</span>
				</div>
				<Button className='text-[12px]'>Apply Now</Button>
			</div>
		</article>
	);
};
