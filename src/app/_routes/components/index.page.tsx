import ComponentGroupItem from "@/components/features/component-group-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link, PageComponent } from "rasengan";

const Page: PageComponent = () => {
	return (
		<section className='w-full h-full bg-background py-4'>
			{/* Gradient */}
			<div className='absolute -top-[300px] left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/70 blur-[500px] z-0'></div>

			{/* Hero */}
			<section className='relative w-full flex flex-col items-center mt-20'>
				<Badge variant='outline' className='bg-accent/30'>
					<span>Rasengan.js v1.1.0 is available</span>
					<ArrowRight />
				</Badge>
				<h1 className='font-bold text-[50px] leading-[60px] text-center max-w-[700px] text-foreground mt-4 text-pretty'>
					Assemble your UI like a true shinobi.
				</h1>
				<p className='max-w-[700px] text-center mt-2 text-foreground text-pretty'>
					<span className='font-medium'>
						Rasengan UI offers a curated set of high-quality, ready-to-use UI
						sections — like hero blocks, pricing sections, testimonials, and
						more.
					</span>{" "}
					<span>
						Each section is crafted with care, powered by Shadcn UI, and easy to
						summon in any React project.
					</span>
				</p>
				<div className='mt-6 flex gap-2'>
					<Button>Browse components</Button>
					<Button variant='outline' className='text-foreground'>
						<span>Explore Templates</span>
					</Button>
				</div>
			</section>

			{/* Tabs */}
			<section className='w-full mt-20 min-h-[calc(100vh-80px)] relative'>
				<div className='sticky -top-[1px] z-30 w-full flex items-center border-[1px] border-border bg-background'>
					<Link to='#marketing-business'>
						<div className='border-r-[1px] border-r-border py-2 px-4 flex items-center justify-center hover:bg-muted/60 hover:cursor-pointer transition-all'>
							<span className='text-foreground'>Marketing & Business</span>
						</div>
					</Link>
					<Link to='#application-ui'>
						<div className='border-r-[1px] border-r-border py-2 px-4 flex items-center justify-center hover:bg-muted/60 hover:cursor-pointer transition-all'>
							<span className='text-foreground'>Appication UI</span>
						</div>
					</Link>
					<div className='border-r-[1px] border-r-border py-2 px-4 flex items-center justify-center hover:bg-muted/60 hover:cursor-pointer transition-all'>
						<span className='text-foreground'>Ecommerce</span>
					</div>
				</div>

				<div id='marketing-business'>
					<div className='mt-20 w-full border-y-[1px] border-y-border p-4'>
						<h2 className='text-xl font-medium text-foreground'>
							Marketing & Business
						</h2>
						<p className='text-foreground/70 mt-2'>
							Ready-to-use UI sections for marketing and business websites.
						</p>
					</div>

					<div className='mt-10 w-full border-y-[1px] border-y-border px-4 py-2'>
						<h3 className='text-lg font-medium text-foreground'>
							Page Section
						</h3>
					</div>

					<div className='mt-4 w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4'>
						<ComponentGroupItem title='Hero Section' components={5} />
						<ComponentGroupItem title='Pricing Section' components={7} />
						<ComponentGroupItem title='Testimonial Section' components={3} />
						<ComponentGroupItem title='Contact Section' components={2} />
						<ComponentGroupItem title='Footer Section' components={5} />
					</div>
				</div>

				<div id='application-ui'>
					<div className='mt-20 w-full border-y-[1px] border-y-border p-4'>
						<h2 className='text-xl font-medium text-foreground'>
							Application UI
						</h2>
						<p className='text-foreground/70 mt-2'>
							Ready-to-use UI sections for application websites.
						</p>
					</div>

					<div className='mt-10 w-full border-y-[1px] border-y-border px-4 py-2'>
						<h3 className='text-lg font-medium text-foreground'>Feedbacks</h3>
					</div>

					<div className='mt-4 w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4'>
						<ComponentGroupItem title='Alerts' components={8} />
						<ComponentGroupItem title='Empty States' components={25} />
						<ComponentGroupItem title='Notifications' components={15} />
					</div>
				</div>
			</section>
		</section>
	);
};

Page.metadata = {
	title: "Components",
	description: "Rasengan UI components",
};

export default Page;
