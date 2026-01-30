import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Lock, Expand, Eye, Maximize2, Minimize2, Code, Code2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Component, ComponentCategoryLabel } from "@/data/components/type";
import { Link, useNavigate } from "rasengan";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ThemeButton from "@/components/common/atoms/theme-button";
import { useComponentStore } from "@/store/components";

type Props = {
	componentId: string
};

export default function ComponentPreview({
	componentId
}: Props) {
	const { getCompoment } = useComponentStore();

	const [fullScreen, setFullScreen] = useState(false);

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

	const component = getCompoment(componentId);

	return (
		<section
			className={
				cn('w-full overflow-hidden transition-all duration-300',
					fullScreen ? "fixed top-0 left-0 w-full h-screen z-50" : "rounded-2xl border-[1px] dark:border-input"
				)
			}
		>
			{/* Actions command */}
			<div className='flex items-center justify-between p-2 border-b-[1px] border-y-border bg-background'>
				<div className='flex items-center gap-2'>
					{/* <ThemeButton /> */}
					<span className="font-semibold text-foreground">{component.name}</span>
				</div>

				<div className="flex items-center gap-2">
					<Button size={"icon"} variant={"outline"} className="text-foreground dark:border-input">
						<Eye />
					</Button>
					<Button size={"icon"} variant={"outline"} className="text-foreground dark:border-input">
						<Code2 />
					</Button>

					{/* vertical separator */}
					<div className='h-4 w-[1px] bg-border dark:bg-input'></div>

					<Button variant={"outline"} className="text-foreground dark:border-input dark:bg-muted/70">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></line>
							<line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></line>
						</svg>
						<span>@rasengan-ui/{component.label}</span>
					</Button>

					<Button className="font-semibold">
						<span>Open in</span>
						<svg viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-current">
							<path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z" fill="currentColor"></path><path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z" fill="currentColor"></path>
						</svg>
					</Button>

					{/* vertical separator */}
					<div className='h-4 w-[1px] bg-border dark:bg-input'></div>

					<Tooltip>
						<TooltipTrigger>
							<Button size='icon' variant='outline' className='border-border dark:border-input' onClick={() => setFullScreen(prev => !prev)}>
								{
									fullScreen ? <Minimize2 size={16} className='text-foreground/70' /> : <Maximize2 size={16} className='text-foreground/70' />
								}
							</Button>
						</TooltipTrigger>
						<TooltipContent side='top'>
							<p>{fullScreen ? "Reduce screen" : "Full screen"}</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>

			{/* Preview */}
			<div
				ref={iframeRef}
				className='w-full'
				style={{ height: fullScreen ? "100%" : component.height }}
			>
				<ResizablePanelGroup
					direction='horizontal'
					className='relative min-h-[200px] w-full md:min-w-[450px] bg-muted dark:bg-border'
				>
					<ResizablePanel
						defaultSize={100}
						className='min-w-[340px] z-10 relative border-r border-r-border'
					>
						{iframeLoaded && (
							<iframe
								src={`${component.link}/?view=preview`}
								className='w-full h-full'
							></iframe>
						)}
					</ResizablePanel>
					<ResizableHandle withHandle className='' />
					<ResizablePanel defaultSize={0}>
						<div className='flex h-full items-center justify-center p-6'></div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</section>
	);
}
