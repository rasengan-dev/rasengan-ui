import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const sizes = { sm: "Small", default: "Default", lg: "Large", full: "Full" } as const;

export default function DialogSizesDemo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			{(Object.keys(sizes) as (keyof typeof sizes)[]).map((size) => (
				<Dialog key={size}>
					<DialogTrigger render={<Button variant="outline" />}>{sizes[size]}</DialogTrigger>
					<DialogContent size={size}>
						<DialogHeader>
							<DialogTitle>{sizes[size]} dialog</DialogTitle>
							<DialogDescription>The size sets the width from the sm breakpoint; full fills the window.</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose render={<Button />}>Done</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			))}
		</div>
	);
}
