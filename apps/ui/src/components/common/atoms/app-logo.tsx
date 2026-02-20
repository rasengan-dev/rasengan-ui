import { useScreen } from "@/hooks/use-screen";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = {
	src?: string;
	text?: string;
	size?: "sm" | "md" | "lg";
	minimal?: boolean;
	className?: ComponentProps<"div">["className"];
};

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export default function AppLogo({
	src = registryUrl + "/rasengan.svg",
	text = "Rasengan UI",
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
				<img
					src={src}
					alt='Rasengan UI Logo'
					width={sizes[size].width}
					height={sizes[size].height}
				/>
			</div>

			{screen !== "xs" && screen !== "sm" && !minimal && (
				<h2 className='font-bold text-lg break-keep text-nowrap'>
					{text}
				</h2>
			)}
		</div>
	);
}
