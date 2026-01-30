import { Button } from "@/components/ui/button";
import { useTheme, Themes } from "@rasenganjs/theme";

export default function ThemeButton() {
	const { isDark, setTheme } = useTheme();

	return (
		<Button variant="ghost" size="icon" onClick={() => setTheme(isDark ? Themes.light : Themes.dark)} className="text-foreground">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
				<circle cx="12" cy="12" r="10"></circle>
				<path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" stroke="none"></path>
			</svg>
		</Button>
	)
}


// import { useTheme } from "@rasenganjs/theme";
// import { Moon, Sun } from "lucide-react";
// import { twMerge } from "tailwind-merge";
// import { Button } from "../../ui/button";

// type Props = {
// 	size?: "normal" | "small";
// };

// export default function ThemeButton({ size = "normal" }: Props) {
// 	const { setTheme, isDark } = useTheme();

// 	const handleThemeChange = () => {
// 		setTheme(isDark ? "light" : "dark");
// 	};

// 	return (
// 		<Button
// 			size='icon'
// 			onClick={handleThemeChange}
// 			className={twMerge(
// 				"relative aspect-square rounded-md border-[1px] border-border bg-primary/5 hover:bg-muted flex shrink-0 items-center justify-center overflow-hidden hover:cursor-pointer dark:hover:bg-muted/30",
// 				size === "small" ? "size-7" : "size-8"
// 			)}
// 		>
// 			{isDark ? (
// 				<div
// 					key='moon'
// 					className='absolute grow-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
// 				>
// 					<Moon size={20} className='text-foreground' />
// 				</div>
// 			) : (
// 				<div
// 					key='sun'
// 					className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
// 				>
// 					<Sun size={20} className='text-foreground' />
// 				</div>
// 			)}
// 		</Button>
// 	);
// }
