import { Button } from "@/components/ui/button";
import { toast, Toaster } from "@/components/ui/toast";

const save = () => new Promise<void>((resolve) => setTimeout(resolve, 1500));

export default function ToastDemo() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button
				variant="outline"
				onClick={() =>
					toast("Invite sent", {
						description: "sakura@konoha.dev will get an email in a minute.",
						action: { label: "Undo", onClick: () => toast("Invite cancelled") },
					})
				}
			>
				Send invite
			</Button>
			<Button variant="outline" onClick={() => toast.promise(save(), { loading: "Saving draft…", success: "Draft saved", error: "Couldn't save the draft" })}>
				Save draft
			</Button>
			<Button variant="outline" onClick={() => toast.error("Couldn't save changes", { description: "You are offline. We will keep your draft." })}>
				Fail a save
			</Button>
			<Toaster />
		</div>
	);
}
