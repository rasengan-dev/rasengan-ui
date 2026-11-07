import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PageTransition, usePageTransition, type PageTransitionEffect } from "@/components/ui/page-transition";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const pages = {
	home: { title: "Ship before lunch", text: "A landing page your village dresses: one attribute, another look." },
	pricing: { title: "Pricing", text: "Free to copy, free to change. The components are yours once installed." },
	docs: { title: "Docs", text: "Install with the CLI, or let your agent do it through the MCP server." },
};
type Page = keyof typeof pages;

function Nav({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
	const { run } = usePageTransition();
	return (
		<nav aria-label="Demo pages" className="flex gap-1 border-b-(length:--border-width) p-2">
			{(Object.keys(pages) as Page[]).map((name) => (
				<Button
					key={name}
					size="sm"
					variant={name === page ? "secondary" : "ghost"}
					aria-current={name === page ? "page" : undefined}
					onClick={(event) => run(() => setPage(name), { x: event.clientX, y: event.clientY })}
					className="capitalize"
				>
					{name}
				</Button>
			))}
		</nav>
	);
}

export default function PageTransitionDemo() {
	const [page, setPage] = useState<Page>("home");
	const [effect, setEffect] = useState<PageTransitionEffect>("wipe");
	const [scope, setScope] = useState<"element" | "page">("element");
	return (
		<div className="flex w-full max-w-lg flex-col items-center gap-4">
			<ToggleGroup aria-label="Effect" size="sm" variant="outline" value={[effect]} onValueChange={(value) => value[0] && setEffect(value[0] as PageTransitionEffect)}>
				{(["wipe", "blinds", "iris", "fade"] as const).map((name) => (
					<ToggleGroupItem key={name} value={name} className="capitalize">
						{name}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<ToggleGroup aria-label="Scope" size="sm" variant="outline" value={[scope]} onValueChange={(value) => value[0] && setScope(value[0] as "element" | "page")}>
				<ToggleGroupItem value="element">In the card</ToggleGroupItem>
				<ToggleGroupItem value="page">Whole page</ToggleGroupItem>
			</ToggleGroup>
			<PageTransition key={scope} id={page} effect={effect} scope={scope} scrollToTop={false} focus="h3" className="w-full rounded-lg border-village bg-card">
				<Nav page={page} setPage={setPage} />
				<article className="flex min-h-44 flex-col gap-2 p-6">
					<h3 className="font-display text-2xl font-semibold tracking-display case-heading outline-none">{pages[page].title}</h3>
					<p className="text-sm text-muted-foreground">{pages[page].text}</p>
				</article>
			</PageTransition>
		</div>
	);
}
