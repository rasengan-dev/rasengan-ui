import { CheckIcon, CircleAlertIcon, LoaderIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { en, type WorkshopLabels } from "./labels";
import { Report } from "./report";
import type { VillageState } from "./use-village";

/** The village's state in one pill ("Accessible · 2 adjusted"); it opens the report. */
export function VillageStatus({ state, labels: l = en, className }: { state: VillageState; labels?: WorkshopLabels; className?: string }) {
	const { village, error, pending } = state;
	const failing = village?.problems.length ?? 0;
	const moved = village?.adjustments.length ?? 0;
	const bad = Boolean(error) || failing > 0;
	const label = !village ? l.status.making : error ? l.status.recipeNeedsFix : failing ? l.status.pairsToFix(failing) : l.status.accessible;
	return (
		<Popover>
			<PopoverTrigger
				render={
					<button
						type="button"
						className={cn(
							"flex cursor-pointer items-center gap-2 rounded-xl py-2 ps-2.5 pe-3.5 text-sm font-medium outline-none transition-colors duration-fast hover:bg-accent focus-visible:focus-ring data-[popup-open]:bg-accent",
							className,
						)}
					/>
				}
			>
				<span className={cn("grid size-6 place-items-center rounded-full", bad ? "bg-destructive text-destructive-foreground" : "bg-success text-success-foreground")} aria-hidden>
					{!village || pending ? <LoaderIcon className="size-3.5 animate-spin" /> : bad ? <CircleAlertIcon className="size-3.5" /> : <CheckIcon className="size-3.5" />}
				</span>
				<span role="status" aria-live="polite">
					{label}
				</span>
				{village && moved ? <span className="hidden text-muted-foreground sm:inline">· {l.status.adjusted(moved)}</span> : null}
			</PopoverTrigger>
			<PopoverContent side="top" align="start" sideOffset={10} className="hide-scrollbar max-h-[70svh] w-96 max-w-[calc(100vw-2rem)] overflow-y-auto">
				<Report state={state} labels={l} />
			</PopoverContent>
		</Popover>
	);
}
