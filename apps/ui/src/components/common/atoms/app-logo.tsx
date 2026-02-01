import { useScreen } from "@/hooks/use-screen";
import { cn } from "@/lib/utils";
import Image from "@rasenganjs/image";
import { ComponentProps } from "react";

type Props = {
	size?: "sm" | "md" | "lg";
	minimal?: boolean;
	className?: ComponentProps<"div">["className"];
};

export default function AppLogo({
	size = "md",
	minimal = false,
	className,
}: Props) {
	const screen = useScreen();

	const sizes = {
		sm: {
			width: 40,
			height: "auto",
		},
		md: {
			width: 60,
			height: "auto",
		},
		lg: {
			width: 100,
			height: "auto",
		},
	};

	return (
		<div
			className={cn(
				"flex items-center gap-1 overflow-hidden text-foreground",
				className
			)}
		>
			<div>
				<Image
					src='/rasengan.svg'
					alt='Logo'
					width={sizes[size].width}
					height={sizes[size].height}
				/>
			</div>

			{screen !== "xs" && screen !== "sm" && !minimal && (
				<h2 className='font-bold text-lg break-keep text-nowrap'>
					Rasengan UI
				</h2>
			)}
		</div>
	);
}
