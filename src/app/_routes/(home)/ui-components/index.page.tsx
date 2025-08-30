import ComponentGroupItem from "@/components/features/component-group-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { componentCategories } from "@/data/components/type";
import { scrollToSection } from "@/lib/utils";
import { useComponentStore } from "@/store/components";
import { ArrowRight } from "lucide-react";
import { Link, PageComponent } from "rasengan";

const Page: PageComponent = () => {
	const { components } = useComponentStore();

	return (
		<section className='w-full min-h-screen h-auto bg-background py-4'>
			{/* Gradient */}
			<div className='absolute -top-[300px] left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/70 blur-[500px] z-0'></div>

			{/* Hero */}
			<section className='relative w-full flex flex-col items-center mt-20'>
				<Badge
					variant='default'
					className='bg-accent/30f bg-primary px-4 py-1 rounded-full'
				>
					<span>Rasengan.js v1.1.0 is available</span>
					<ArrowRight />
				</Badge>
				<h1 className='font-bold text-[50px] leading-[60px] text-center max-w-[700px] text-foreground mt-4 text-pretty'>
					Assemble your UI like a true shinobi.
				</h1>
				<p className='max-w-[700px] text-center mt-2 text-foreground text-pretty px-4'>
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
				{/* <div className='mt-6 flex gap-2'>
					<Button>Browse components</Button>
					<Button variant='outline' className='text-foreground'>
						<span>Explore Templates</span>
					</Button>
				</div> */}
			</section>

			{/* Tabs */}
			<section className='w-full mt-20 min-h-[calc(100vh-80px)] relative'>
				<div className='sticky -top-[1px] z-20 w-full flex items-center border-[1px] border-border bg-background'>
					{Object.entries(components).map(([key, category]) => (
						<Link
							key={key}
							to={`#${key}`}
							onClick={(e) => scrollToSection(e, key)}
						>
							<div className='border-r-[1px] border-r-border py-2 px-4 flex items-center justify-center hover:bg-muted/60 hover:cursor-pointer transition-all'>
								<span className='text-foreground'>{category.name}</span>
							</div>
						</Link>
					))}
				</div>

				{Object.entries(components).map(([key, category]) => (
					<div key={key} id={key}>
						<div className='mt-20 w-full border-y-[1px] border-y-border p-4'>
							<h2 className='text-xl font-medium text-foreground'>
								{category.name}
							</h2>
							<p className='text-foreground/70 mt-2 max-w-[800px]'>
								{category.description}
							</p>
						</div>

						{category.components.map((group) => (
							<div key={group.label}>
								<div className='mt-10 w-full border-y-[1px] border-y-border px-4 py-2'>
									<h3 className='text-lg font-medium text-foreground'>
										{group.name}
									</h3>
								</div>

								<div className='mt-4 w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4'>
									{group.componentsType.map((type) => (
										<ComponentGroupItem
											key={type.label}
											title={type.name}
											components={type.components.length}
											link={`/ui-components/${category.label}/${group.label}/${type.label}`}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				))}
			</section>
		</section>
	);
};

Page.metadata = {
	title: "Components",
	description: "Rasengan UI components",
};

export default Page;
