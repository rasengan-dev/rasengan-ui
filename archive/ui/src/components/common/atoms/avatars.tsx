import Image from "@rasenganjs/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	images: string[];
	size?: number;
	gap?: number;
	className?: ComponentProps<"div">["className"];
};

export default function Avatars({
	images,
	size = 25,
	gap = 16,
	className,
}: Props) {
	return (
		<div
			className={twMerge(
				"flex justify-end items-center relative w-[100px] h-8 rounded-full py-1 px-3 text-foreground",
				className
			)}
		>
			{images.map((image, index) => (
				<div
					key={index}
					className='absolute left-0 top-1/2 -translate-y-1/2 z-10'
					style={{ left: index * gap }}
				>
					<Image
						src={image}
						alt='avatar'
						className='rounded-full'
						width={size}
						height={size}
					/>
				</div>
			))}

			{/* <span className='text-[12px] font-medium'>+4k</span> */}
		</div>
	);
}
