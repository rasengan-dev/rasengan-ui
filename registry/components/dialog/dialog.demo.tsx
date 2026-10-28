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
					className="h-control rounded-control border-village border-input bg-input-bg px-input-x text-sm shadow-input outline-none focus-visible:border-primary focus-visible:focus-ring"
				/>
				<DialogFooter>
					<DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
					<Button>Send invite</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
