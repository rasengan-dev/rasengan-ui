import { PricingItem } from "@/components/features/sections/pricing";
import { TemplateTechnologies } from "@/components/features/templates/template-technologies";
import { Button } from "@/components/ui/button";
import { productsList, templateProductsList } from "@/data/products";
import { cn } from "@/lib/utils";
import { Check, Eye } from "lucide-react";
import { Link, PageComponent, useParams } from "rasengan";
import { useTemplateStore } from "@/store/templates";

const Page: PageComponent = () => {
	const { name: templateName } = useParams();

	const { getTemplate } = useTemplateStore();

	const template = getTemplate(templateName || "");

	return (
		<section className='w-full min-h-screen h-auto bg-background py-4'>
			<section
				id='browse'
				className='w-full flex flex-col lg:flex-row items-start justify-between mt-20 relative border-y border-y-border'
			>
				<div className='w-full min-h-[180px] flex flex-col border-b lg:border-b-0 lg:border-r lg:border-r-border'>
					<div className='p-4 text-foreground flex flex-col justify-center h-full'>
						<p className='text-foreground/70 text-sm uppercase'>
							{template?.heading}
						</p>
						<h2 className='font-bold text-[60px] sm:text-[70px] leading-12 mt-4'>
							{template?.name}
						</h2>
					</div>
					<div className='w-full h-[50px] border-t border-t-border p-2 text-foreground flex items-center'>
						<TemplateTechnologies />
					</div>
				</div>
				<div className='w-20 h-[50px] lg:h-[180px]'></div>
				<div className='w-full min-h-[180px] h-full flex flex-col justify-between border-t lg:border-t-0 lg:border-l lg:border-l-border'>
					<div className='relative p-4 text-foreground flex flex-col justify-center gap-4 h-full'>
						<p className='text-foreground/70 text-lg'>
							{template?.description}
						</p>
						{template?.inspiration && (
							<p className='text-end text-foreground/70 text-sm'>
								Inspired by{" "}
								<Link
									to={template?.inspiration?.url || "#"}
									target='_blank'
									className='text-primary hover:underline'
								>
									{template?.inspiration?.name}
								</Link>
							</p>
						)}
					</div>
					<div className='w-full h-[50px] border-t border-t-border p-2 text-foreground flex items-center'>
						<div className='flex gap-2'>
							<Link to={`/preview/template/${templateName}`} target='_blank'>
								<Button variant='outline' className='text-foreground'>
									<Eye />
									<span>Preview</span>
								</Button>
							</Link>
							<Link to='#pricing'>
								<Button>Get Template</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className='mt-20 w-full border-y border-y-border p-2'>
				<img
					src={template?.images[0]}
					className='w-full h-auto rounded-lg border'
				/>
			</section>

			<section
				id='pricing'
				className='mt-20 w-full flex flex-col lg:flex-row border-y border-y-border'
			>
				<div className='w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r'>
					<div className='text-foreground flex flex-col border-b p-2'>
						<p className='text-foreground/70 text-sm'>PRICING</p>
						<h2 className='font-bold text-3xl leading-10 mt-2'>
							Get either your template or the full collection
						</h2>
					</div>

					<div className='mt-6 border-y text-foreground/70 p-2'>
						Every template includes free updates, and can be used on unlimited
						projects — both personal and commercial.
					</div>

					<div className='mt-6 border-y text-foreground/70 p-2'>
						<TemplateTechnologies />
					</div>

					<div className='mt-6 h-auto border-t text-foreground/70 p-2 bg-input/40'>
						<article
							className={cn(
								"relative w-full h-full min-w-[300px] md:min-w-[400px] rounded-3xl p-8 border mx-auto flex flex-col justify-between",
								"bg-background"
							)}
						>
							<h2 className='text-2xl font-bold text-foreground'>
								{template?.name}
							</h2>
							<div className='w-full flex flex-col sm:flex-row gap-4 sm:items-center justify-between mt-4'>
								<div className='flex flex-col sm:flex-row gap-2 sm:items-center'>
									<div className='flex items-center gap-2'>
										<span className='text-4xl font-medium text-foreground/70'>
											<span className='text-3xl'>{template?.symbol}</span>
											<span className='line-through'>{template?.price}</span>
										</span>
										<span className='text-5xl font-medium text-foreground'>
											<span className='text-3xl'>{template?.symbol}</span>
											<span>{template?.newPrice}</span>
										</span>
									</div>
									<div className='flex flex-col text-[12px]'>
										<span className='text-foreground'>One-time payment</span>
										<span className='text-foreground/70'>Lifetime access</span>
									</div>
								</div>

								<Link to={template?.link || "#"} target='_blank'>
									<Button className={cn("w-full px-4")}>Get template</Button>
								</Link>
							</div>

							<p className='mt-4 text-sm text-foreground/70'>
								{template?.description}
							</p>

							<div className='mt-4 border-t pt-4 border-t-border'>
								<div className='mt-2 flex flex-col gap-2'>
									<div className='flex gap-2 items-center'>
										<Button
											size={"icon"}
											className='size-6 rounded-full bg-transparent'
										>
											<Check className='text-foreground' />
										</Button>

										<span className='text-sm text-foreground'>
											Unlimited projects
										</span>
									</div>
									<div className='flex gap-2 items-center'>
										<Button
											size={"icon"}
											className='size-6 rounded-full bg-transparent'
										>
											<Check className='text-foreground' />
										</Button>

										<span className='text-sm text-foreground'>
											Free updates
										</span>
									</div>
									<div className='flex gap-2 items-center'>
										<Button
											size={"icon"}
											className='size-6 rounded-full bg-transparent'
										>
											<Check className='text-foreground' />
										</Button>

										<span className='text-sm text-foreground'>
											Simple .zip file
										</span>
									</div>
								</div>
							</div>
						</article>
					</div>
				</div>

				<div className='h-[50px] lg:h-auto lg:w-[50px]'></div>

				<div className='w-full lg:w-1/2 p-2 bg-input/40 border-t lg:border-t-0 lg:border-l'>
					<PricingItem product={productsList[0]} />
				</div>
			</section>
		</section>
	);
};

Page.loader = async ({ params }) => {
	const template = templateProductsList.find(
		(template) => template.slug === params.name
	);

	return {
		meta: {
			title: `${template?.name} - Rasengan UI Templates`,
			description: template?.description,
			openGraph: {
				title: `${template?.name} - Rasengan UI Templates`,
				description: template?.description,
				image: `https://ui.rasengan.dev${template?.images[0]}`,
				url: `https://rasenganui.com/templates/${template?.name}`,
			},
			twitter: {
				title: `${template?.name} - Rasengan UI Templates`,
				description: template?.description,
				image: `https://ui.rasengan.dev${template?.images[0]}`,
				site: `https://rasenganui.com/templates/${template?.name}`,
				card: "summary_large_image",
			},
		},
	};
};

export default Page;
