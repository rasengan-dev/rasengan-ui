import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const sides = ["top", "right", "bottom", "left"] as const;

export default function SheetSidesDemo() {
	return (
		<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
			{sides.map((side) => (
				<Sheet key={side}>
					<SheetTrigger render={<Button variant="outline" className="capitalize" />}>{side}</SheetTrigger>
					<SheetContent side={side} size={side === "bottom" ? "sm" : "default"}>
						<SheetHeader>
							<SheetTitle className="capitalize">{side}</SheetTitle>
							<SheetDescription>Swipe it back toward the {side === "top" || side === "bottom" ? `${side}` : `${side} edge`}, press Escape or click outside to close it.</SheetDescription>
						</SheetHeader>
						<div className="px-6 pb-6 text-sm text-muted-foreground">On a phone, a bottom sheet is easier to reach than a dialog in the middle of the screen.</div>
					</SheetContent>
				</Sheet>
			))}
		</div>
	);
}
