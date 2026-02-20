import { Button } from "@/components/ui/button"
import { useTheme } from "@rasenganjs/theme"
import { Rocket } from "lucide-react"
import { Link } from "rasengan"

export const AdsCard = () => {
	const { isDark } = useTheme();

	return (
		<div className='mt-4 border rounded-lg text-foreground bg-input/10 dark:bg-input/60 overflow-hidden'>
			<img
				src={isDark ? "/static/images/templates/plus-ultra/2.png" : "/static/images/templates/plus-ultra/1.png"}
				className="w-full h-auto"
			/>

			<div className="p-4">
				<h2 className='font-bold text-lg'>Discover Plus Ultra ✨</h2>

				<p className='text-foreground/70 my-4 text-sm text-pretty'>
					A stunning and well crafted <span className="text-foreground font-bold">Portfolio website</span> to showcase your work in a nice way.
				</p>

				<Link to='/templates/plus-ultra' target='_blank'>
					<Button className='h-10  w-full'>
						<Rocket />
						<span>Get Started</span>
					</Button>
				</Link>
			</div>
		</div>
	)
}