import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Lock, Expand } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Component } from "@/data/components/type";
import { Link, useNavigate, useParams } from "rasengan";
import { scrollToSection } from "@/lib/utils";

type Props = {
	component: Component;
};

export default function ComponentPreview({ component }: Props) {
	const { category, group, type } = useParams();

	const navigate = useNavigate();

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
				<div className='flex items-center gap-2'>
					{component.pricing === "premium" ? (
						<Link
							to='/#pricing'
							onClick={(e) => handleNavigateToSection(e, "pricing")}
						>
							<Button variant={"outline"} className='text-foreground/70'>
								<Lock />
								<span>Get the Code</span>
							</Button>
						</Link>
					) : (
						<span>Free</span>
					)}
				</div>

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
			</div>

			{/* Preview */}
			<div className='w-full' style={{ height: component.height }}>
				<ResizablePanelGroup
					direction='horizontal'
					className='relative min-h-[200px] w-full md:min-w-[450px] bg-border/70f dark:bg-borderf'
				>
					<ResizablePanel
						defaultSize={100}
						className='min-w-[340px] z-10 relative border-r border-border'
					>
						<iframe
							src={component.link}
							className='w-full h-full border-l border-border'
						></iframe>
					</ResizablePanel>
					<ResizableHandle withHandle className='' />
					<ResizablePanel defaultSize={0}>
						<div className='flex h-full items-center justify-center p-6'></div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>

			<div className='h-20 w-full flex items-center justify-between p-2 border-t-[1px] border-t-border'></div>
		</section>
	);
}
