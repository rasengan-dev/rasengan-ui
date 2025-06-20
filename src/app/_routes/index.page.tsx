import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section className='w-full h-screen bg-background p-4'>
			{/* Hero */}
			<section className='w-full flex flex-col items-center mt-20'>
				<Badge variant='outline' className='bg-accent'>
					<span>Rasengan.js v1.1.0 is available</span>
					<ArrowRight />
				</Badge>
				<h1 className='font-bold text-[50px] leading-[60px] text-center max-w-[700px] text-foreground mt-4'>
					Build Faster. Style Sharper.
				</h1>
				<p className='max-w-[700px] text-center mt-2 text-foreground'>
					<span className='font-medium'>
						Rasengan UI gives you chakra-infused, beautifully crafted UI
						components built for any React app.
					</span>{" "}
					<span>
						Each component is themeable, responsive, and ready to drop into your
						code — powered by Shadcn UI.
					</span>
				</p>
				<div className='mt-6 flex gap-2'>
					<Button>Browse components</Button>
					<Button variant='outline' className='text-foreground'>
						<Lock />
						<span>Unlock Premium</span>
					</Button>
				</div>
			</section>
		</section>
	);
};

export default Page;
