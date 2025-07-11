import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Lock, Expand, Eye } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Component, ComponentCategoryLabel } from "@/data/components/type";
import { Link, useNavigate } from "rasengan";
import { scrollToSection } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import PricingSection from "./sections/pricing";

type Props = {
	component: Component;
	category: ComponentCategoryLabel;
	group: string;
	type: string;
};

export default function ComponentPreview({
	component,
	category,
	group,
	type,
}: Props) {
	const navigate = useNavigate();

	const [showCode, setShowCode] = useState(false);

	// Reference
	const iframeRef = useRef<HTMLDivElement | null>(null);

	// Load the component iframe when in the view port
	const [iframeLoaded, setIframeLoaded] = useState(false);

	useEffect(() => {
		// Check if IntersectionObserver is supported
		if (!("IntersectionObserver" in window)) {
			setIframeLoaded(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIframeLoaded(true);
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.1,
			}
		);

		const element = iframeRef.current;

		if (element) {
			observer.observe(element);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	const handleNavigateToSection = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		sectionId: string
	) => {
		// Check if we are on the home page
		if (window.location.pathname === "/") {
			scrollToSection(e, sectionId);
			return;
		}

		// Redirect to the pricing page
		navigate("/#pricing");
	};

	return (
		<section className='w-full border-b-[1px] border-b-border'>
			{/* Actions command */}
			<div className='flex items-center justify-between p-2 border-y-[1px] border-y-border'>
				<Tooltip>
					<TooltipTrigger>
						<Link
							to={`/preview/${category}/${group}/${type}/${component.label}`}
							target='_blank'
						>
							<Button size='icon' variant='outline' className='border-border'>
								<Expand size={16} className='text-foreground/70' />
							</Button>
						</Link>
					</TooltipTrigger>
					<TooltipContent side='left'>
						<p>Preview in full screen</p>
					</TooltipContent>
				</Tooltip>

				<div className='flex items-center gap-2'>
					{component.pricing === "premium" ? (
						<Button onClick={() => setShowCode((prev) => !prev)}>
							{showCode ? <Eye /> : <Lock />}
							<span>{showCode ? "Show Preview" : "Get the Code"}</span>
						</Button>
					) : (
						<span>Free</span>
					)}
				</div>
			</div>

			{/* Preview */}
			<div
				ref={iframeRef}
				className='w-full'
				style={{ height: component.height }}
			>
				{showCode ? (
					<PricingSection />
				) : (
					<ResizablePanelGroup
						direction='horizontal'
						className='relative min-h-[200px] w-full md:min-w-[450px] bg-border/70f dark:bg-borderf'
					>
						<ResizablePanel
							defaultSize={100}
							className='min-w-[340px] z-10 relative border-r border-border'
						>
							{iframeLoaded && (
								<iframe
									src={component.link}
									className='w-full h-full border-l border-border'
								></iframe>
							)}
						</ResizablePanel>
						<ResizableHandle withHandle className='' />
						<ResizablePanel defaultSize={0}>
							<div className='flex h-full items-center justify-center p-6'></div>
						</ResizablePanel>
					</ResizablePanelGroup>
				)}
			</div>

			<div className='h-20 w-full flex items-center justify-between p-2 border-t-[1px] border-t-border'></div>
		</section>
	);
}
