import { Button } from "@/components/ui/button";
import { PanelLeftOpen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SidebarNavigation from "./sidebar";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import { useLocation } from "rasengan";

export default function SidebarProvider() {
	const { pathname } = useLocation();

	const [open, setOpen] = useState(pathname === "/" ? true : false);
	const { isDark } = useTheme();

	return (
		<div className={cn(isDark ? "dark" : "", "")}>
			<div className='w-auto'>
				<motion.div
					className='fixed bottom-0 left-0 top-0 z-50'
					initial={{ x: "-100%" }}
					animate={{ x: open ? 0 : "-100%" }}
					// exit={{ x: open ? 0 : -100 }}
				>
					<SidebarNavigation onClose={() => setOpen(false)} />
				</motion.div>

				{/* Fixed button toggler */}
				<div className='fixed bottom-0 left-0 p-4 z-30'>
					<Button
						variant='default'
						size='icon'
						className='size-12 rounded-full shadow-2xl border border-border/20'
						onClick={() => setOpen(!open)}
					>
						<PanelLeftOpen />
					</Button>
				</div>
			</div>

			{/* Fixed overlay */}
			<AnimatePresence>
				{open && (
					<motion.div
						className='fixed inset-0 bg-black/80 backdrop-blur-mdf z-20'
						animate={{ opacity: open ? 1 : 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={() => setOpen(false)}
					></motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
