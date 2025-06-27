import { useTheme } from "@rasenganjs/theme";
import { Moon, Sun } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "../../ui/button";

type Props = {
	size?: "normal" | "small";
};

export default function ThemeButton({ size = "normal" }: Props) {
	const { setTheme, isDark } = useTheme();

	const handleThemeChange = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Button
			size='icon'
			onClick={handleThemeChange}
			className={twMerge(
				"relative aspect-square rounded-md border-[1px] border-border bg-primary/5 hover:bg-muted flex shrink-0 items-center justify-center overflow-hidden hover:cursor-pointer dark:hover:bg-muted/30",
				size === "small" ? "size-7" : "size-8"
			)}
		>
			{isDark ? (
				<div
					key='moon'
					className='absolute grow-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
				>
					<Moon size={20} className='text-foreground' />
				</div>
			) : (
				<div
					key='sun'
					className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
				>
					<Sun size={20} className='text-foreground' />
				</div>
			)}
		</Button>
	);
}
