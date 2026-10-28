import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDemo() {
	return (
		<div className="grid w-full max-w-sm gap-4" role="status" aria-label="Loading profile">
			<div className="flex items-center gap-3">
				<Skeleton className="size-11 rounded-pill" />
				<div className="grid flex-1 gap-2">
					<Skeleton className="h-3 w-3/5" />
					<Skeleton className="h-3 w-2/5" />
				</div>
			</div>
			<Skeleton className="h-24" />
		</div>
	);
}
