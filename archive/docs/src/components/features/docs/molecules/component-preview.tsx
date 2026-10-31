import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Eye, Maximize2, Minimize2, Code2, CircleCheck } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useComponentStore } from "@/store/components";
import { CodePreview } from "./code-preview";
import { OpenInV0Button } from "@/components/common/atoms/open-in-vo-button";
import { useTheme } from "@rasenganjs/theme";

const { RASENGAN_REGISTRY_URL } = import.meta.env;

type Props = {
	componentId: string
};

export default function ComponentPreview({
	componentId
}: Props) {
	const { isDark } = useTheme();
	const { getCompoment } = useComponentStore();

	const [fullScreen, setFullScreen] = useState(false);

	// Reference
	const iframeRef = useRef<HTMLDivElement | null>(null);

	// Load the component iframe when in the view port
	const [iframeLoaded, setIframeLoaded] = useState(false);
	const [code, setCode] = useState("");
	const [previewEnabled, setPreviewEnabled] = useState(true);
	const [isCopied, setIsCopied] = useState(false);

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

	useEffect(() => {
		(async () => {
			const response = await fetch(`${RASENGAN_REGISTRY_URL}/r/${componentId}.json`);
			const data = await response.json();

			setCode(`~~~tsx\n${data["files"][0].content}\n~~~`);
		})();
	}, [componentId]);

	const handleCopyCommand = () => {
		navigator.clipboard.writeText(`npx shadcn@latest add @rasengan-ui/${componentId}`);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	}

	const component = getCompoment(componentId);

	return (
		<section
			className={
				cn('w-full overflow-hidden transition-all duration-300 bg-background',
					fullScreen ? "fixed top-0 left-0 w-full h-screen z-50" : "rounded-2xl border-[1px] dark:border-input"
				)
			}
		>
			{/* Actions command */}
			<div className='flex items-center justify-between p-2 border-b-[1px] border-y-border bg-background'>
				<div className='flex items-center gap-2'>
					{/* <ThemeButton /> */}
					<span className="font-semibold text-foreground text-sm">{component.name}</span>
				</div>

				<div className="flex items-center gap-2">
					<Button size={"icon"} variant={previewEnabled ? "default" : "outline"} className={cn("dark:border-input", !previewEnabled && "text-foreground")} onClick={() => setPreviewEnabled(true)}>
						<Eye />
					</Button>
					<Button size={"icon"} variant={!previewEnabled ? "default" : "outline"} className={cn("dark:border-input", previewEnabled && "text-foreground")} onClick={() => setPreviewEnabled(false)}>
						<Code2 />
					</Button>

					{/* vertical separator */}
					<div className='h-4 w-[1px] bg-border dark:bg-input'></div>

					<Button variant={"outline"} className="text-foreground dark:border-input dark:bg-muted/70" onClick={handleCopyCommand}>
						{
							isCopied ? (
								<CircleCheck />
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
									<rect width="256" height="256" fill="none"></rect>
									<line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></line>
									<line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></line>
								</svg>
							)
						}
						<span>@rasengan-ui/{component.label}</span>
					</Button>

					<OpenInV0Button url={`https://v0.dev/chat/api/open?url=${RASENGAN_REGISTRY_URL}/r/${componentId}.json`} />

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
			{
				previewEnabled ? (
					<div
						ref={iframeRef}
						className='w-full'
						style={{ height: fullScreen ? "calc(100% - 50px)" : component.height }}
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
				) : (
					<CodePreview content={code} dark={isDark} fullScreen={fullScreen} />
				)
			}

		</section>
	);
}
