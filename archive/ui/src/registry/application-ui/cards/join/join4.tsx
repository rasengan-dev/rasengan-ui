import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
	className?: ComponentProps<"div">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const JoinCard4 = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"max-w-[300px] border border-border bg-background rounded-3xl p-4 flex items-center justify-between gap-8",
				className
			)}
		>
			<div className='flex items-center gap-2'>
				<img
					src={`${registryUrl}/static/images/avatars/1.jpeg`}
					alt='Avatar'
					className='rounded-full bg-primary/20 flex items-center justify-center'
					width={40}
					height={40}
				/>
				<div className='flex flex-col'>
					<p className='text-foreground font-bold text-sm'>UX Support Group</p>
					<p className='text-foreground/50 text-sm'>3529 members</p>
				</div>
			</div>

			<div>
				<Button size={"icon"} variant={"outline"} className='rounded-xl'>
					<ArrowRightCircle className='h-4 w-4 opacity-70 text-foreground' />
				</Button>
			</div>
		</div>
	);
};
