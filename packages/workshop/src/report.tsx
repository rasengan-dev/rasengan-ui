import { CheckIcon, CircleAlertIcon, LoaderIcon } from "lucide-react";
import type { Village } from "@rasengan-ui/villages/engine";
import { cn } from "@/lib/utils";
import { en, type WorkshopLabels } from "./labels";
import type { VillageState } from "./use-village";

function Status({ state, labels: l }: { state: VillageState; labels: WorkshopLabels }) {
	const { village, error, pending } = state;
	const failing = village?.problems.length ?? 0;
	const tone = error || failing ? "destructive" : "success";
	const title = error ? l.status.recipeNeedsFix : failing ? l.status.needsChange : l.status.accessible;
	const line = error ? error.replace(/^Invalid recipe:\s*/, "") : failing ? l.status.pairsTooLow(failing) : l.status.accessibleLine;
	return (
		<div className="flex items-start gap-3">
			<span className={cn("grid size-8 shrink-0 place-items-center rounded-full", tone === "success" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground")} aria-hidden>
				{pending && !village ? <LoaderIcon className="size-4 animate-spin" /> : tone === "success" ? <CheckIcon className="size-4" /> : <CircleAlertIcon className="size-4" />}
			</span>
			<div className="grid min-w-0 gap-0.5" role="status" aria-live="polite">
				<strong className="font-semibold">{pending && !village ? l.status.making : title}</strong>
				<span className="text-sm whitespace-pre-line text-muted-foreground">{pending && !village ? l.status.makingHint : line}</span>
			</div>
		</div>
	);
}

function Brand({ village, labels: l }: { village: Village; labels: WorkshopLabels }) {
	const lines = (["light", "dark"] as const).map((scheme) => {
		const moved = village.adjustments.find((a) => a.scheme === scheme && a.token === "--primary-l");
		const text = village.adjustments.find((a) => a.scheme === scheme && a.token === "--on-primary");
		const change = moved ? l.report.brandAdjusted(String(moved.from), String(moved.to)) : l.report.brandAsPicked;
		// The text on it switched to the other scheme's: dark text in light mode, light text in dark mode.
		const flipped = text ? `, ${scheme === "light" ? l.report.withDarkText : l.report.withLightText}` : "";
		return `${scheme === "light" ? l.light : l.dark}: ${change}${flipped}.`;
	});
	return (
		<div className="grid gap-1 rounded-control bg-muted p-3 text-sm">
			<span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{l.report.brandColour}</span>
			{lines.map((line) => (
				<span key={line}>{line}</span>
			))}
		</div>
	);
}

/** What the engine did with the recipe: the status, the brand colour's moves, the pairs that fail, the adjustments. */
export function Report({ state, labels: l = en, className }: { state: VillageState; labels?: WorkshopLabels; className?: string }) {
	const { village } = state;
	const adjustments = village?.adjustments.filter((a) => a.token !== "--primary-l" && a.token !== "--on-primary") ?? [];
	return (
		<div className={cn("grid items-start gap-3", className)}>
			<section className="grid gap-4 rounded-lg border-village p-4">
				<Status state={state} labels={l} />
				{village && village.ownNature ? <Brand village={village} labels={l} /> : null}
			</section>

			{village?.problems.length ? (
				<section className="grid gap-2 rounded-lg border-village p-4">
					<h2 className="text-sm font-semibold">{l.report.tooLow}</h2>
					{village.problems.map((p) => (
						<div key={`${p.scheme} ${p.pair}`} className="grid gap-0.5 rounded-control border-village p-3 text-sm">
							<span className="font-mono text-xs break-all">{p.pair}</span>
							<span className="text-muted-foreground">
								{p.scheme === "light" ? l.light : l.dark}: {l.report.pairNeeds(p.value.toFixed(2), p.min)}
							</span>
						</div>
					))}
				</section>
			) : null}

			{village ? (
				<section className="grid gap-2 rounded-lg border-village p-4">
					<div className="flex items-baseline justify-between">
						<h2 className="text-sm font-semibold">{l.report.adjustments}</h2>
						<span className="text-xs text-muted-foreground">{adjustments.length ? l.report.adjustmentsMade(adjustments.length) : ""}</span>
					</div>
					{adjustments.length === 0 ? <p className="text-sm text-muted-foreground">{l.report.noAdjustments}</p> : null}
					{adjustments.map((a) => (
						<div key={`${a.scheme} ${a.token} ${a.to}`} className="grid gap-0.5 rounded-control border-village p-3 text-sm">
							<span className="flex justify-between gap-2 font-mono text-xs">
								<span className="break-all">{a.token}</span>
								<span className="text-muted-foreground">{a.scheme}</span>
							</span>
							<span className="font-mono text-xs">
								{a.from} → {a.to}
							</span>
							<span className="text-xs text-muted-foreground">{l.report.reasons[a.reason] ?? l.report.reasonFallback(a.reason)}</span>
						</div>
					))}
					{village.notes.map((note) => (
						<p key={note} className="text-xs text-muted-foreground">
							{note}
						</p>
					))}
				</section>
			) : null}
		</div>
	);
}
