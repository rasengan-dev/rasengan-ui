import { Link, PageComponent, useParams } from "rasengan";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Laptop2, Lock, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeButton from "@/components/common/atoms/theme-button";
import { templateProductsList } from "@/data/products";
import { useTemplateStore } from "@/store/templates";

const Page: PageComponent = () => {
	// const { components } = useComponentStore();

	const [isMobile, setIsMobile] = useState(false);
	const [mode, setMode] = useState("desktop");

	const { name: templateName } = useParams();

	const { getTemplate } = useTemplateStore();

	const template = getTemplate(templateName || "");

	return (
		<section className='bg-background relative h-screen w-screen overflow-hidden p-4'>
			<div className='flex h-[3rem] items-center justify-between'>
				<div>
					<div className='text-foreground flex gap-1'>
						<span>{template?.name}</span>
					</div>
					<span className='text-muted-foreground text-sm'>
						{template?.heading}
					</span>
				</div>

				<div>
					<div className='flex items-center gap-2'>
						<Button
							size='icon'
							variant='outline'
							onClick={() => setMode("desktop")}
							className={cn(
								"text-foreground",
								mode === "desktop" &&
									"bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground dark:hover:bg-primary/80 dark:hover:text-primary-foreground"
							)}
						>
							<Laptop2 />
						</Button>
						<Button
							size='icon'
							variant='outline'
							onClick={() => setMode("tablet")}
							className={cn(
								"text-foreground",
								mode === "tablet" &&
									"bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground dark:hover:bg-primary/80 dark:hover:text-primary-foreground"
							)}
						>
							<Tablet className='rotate-90' />
						</Button>
						<Button
							size='icon'
							variant='outline'
							onClick={() => setMode("mobile")}
							className={cn(
								"text-foreground",
								mode === "mobile" &&
									"bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground dark:hover:bg-primary/80 dark:hover:text-primary-foreground"
							)}
						>
							<Tablet />
						</Button>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<Link
						to={`/templates/${templateName?.toLowerCase()}/#pricing`}
						className='w-full sm:w-auto'
					>
						<Button
							className='w-full sm:w-auto'
							// variant='outline'
						>
							<Lock />
							<span>Get Template</span>
						</Button>
					</Link>
					<ThemeButton />
				</div>
			</div>
			<div className='w-full h-[calc(100vh-6rem)] overflow-hiddenf'>
				<iframe
					src={template?.preview}
					className={`${
						mode === "mobile"
							? "w-[375px] h-[667px] scale-95"
							: mode === "tablet"
							? "w-[924px] h-[700px] scale-95"
							: "w-full h-full"
					} border border-border rounded-lg mt-4 mx-auto transition-all duration-300`}
				></iframe>
			</div>
		</section>
	);
};

Page.loader = async ({ params }) => {
	const template = templateProductsList.find(
		(template) => template.name.toLowerCase() === params.name.toLowerCase()
	);

	return {
		meta: {
			title: `${template?.name} - Preview`,
			description: template?.description,
			openGraph: {
				title: `${template?.name} - Preview`,
				description: template?.description,
				image: `https://ui.rasengan.dev${template?.images[0]}`,
				url: `https://rasenganui.com/templates/${template?.name}`,
			},
			twitter: {
				title: `${template?.name} - Preview`,
				description: template?.description,
				image: `https://ui.rasengan.dev${template?.images[0]}`,
				site: `https://rasenganui.com/templates/${template?.name}`,
				card: "summary_large_image",
			},
		},
	};
};

export default Page;
