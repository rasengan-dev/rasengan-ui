import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const Brands1 = () => {
	return (
		<div className='flex items-start justify-center flex-wrap gap-x-8 gap-y-4'>
			<img
				src='/static/images/brands/white/1.png'
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
			<img
				src='/static/images/brands/white/2.png'
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
			<img
				src='/static/images/brands/white/3.png'
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
			<img
				src='/static/images/brands/white/4.png'
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
			<img
				src='/static/images/brands/white/5.png'
				alt='Brand'
				height={50}
				width='auto'
				className='object-contain'
			/>
		</div>
	);
};

export const Brands2 = ({
	className,
}: {
	className?: ComponentProps<"div">["className"];
}) => {
	return (
		<div
			className={"flex items-start justify-center flex-wrap gap-x-8 gap-y-4"}
		>
			<div
				className={cn(
					"flex items-center justify-center p-4 rounded-2xl",
					className
				)}
			>
				<img
					src='/static/images/brands/white/6.png'
					alt='Brand'
					height={50}
					width='auto'
					className='object-contain'
				/>
			</div>
			<div
				className={cn(
					"flex items-center justify-center p-4 rounded-2xl",
					className
				)}
			>
				<img
					src='/static/images/brands/white/7.png'
					alt='Brand'
					height={50}
					width='auto'
					className='object-contain'
				/>
			</div>
			<div
				className={cn(
					"flex items-center justify-center p-4 rounded-2xl",
					className
				)}
			>
				<img
					src='/static/images/brands/white/8.png'
					alt='Brand'
					height={50}
					width='auto'
					className='object-contain'
				/>
			</div>
			<div
				className={cn(
					"flex items-center justify-center p-4 rounded-2xl",
					className
				)}
			>
				<img
					src='/static/images/brands/white/9.png'
					alt='Brand'
					height={50}
					width='auto'
					className='object-contain'
				/>
			</div>
			<div
				className={cn(
					"flex items-center justify-center p-4 rounded-2xl",
					className
				)}
			>
				<img
					src='/static/images/brands/white/10.png'
					alt='Brand'
					height={50}
					width='auto'
					className='object-contain'
				/>
			</div>
		</div>
	);
};
