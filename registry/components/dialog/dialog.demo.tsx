import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogDemo() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>Invite a teammate</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite a teammate</DialogTitle>
					<DialogDescription>They get access to every project in this workspace.</DialogDescription>
				</DialogHeader>
				<input
					type="email"
					placeholder="sakura@konoha.dev"
					className="h-control rounded-md border-village border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
				/>
				<DialogFooter>
					<DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
					<Button>Send invite</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
