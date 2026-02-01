import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section
			className={cn(
				"w-full min-h-screen h-auto flex flex-col p-4 bg-background"
			)}
		>
			<header className='w-full h-auto flex justify-between items-center'>
				<Link to='/' className='size-8'>
					<Button size={"icon"} variant={"ghost"} className='size-8'>
						<AppLogo size='sm' />
					</Button>
				</Link>

				<div className='w-auto h-auto flex items-center gap-2'>
					<ThemeButton />
				</div>
			</header>

			<div className='w-full max-w-[360px] mx-auto h-auto flex flex-col mt-20'>
				Failed too login
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Failed to login",
	description: "Failed to login",
};

export default Page;
