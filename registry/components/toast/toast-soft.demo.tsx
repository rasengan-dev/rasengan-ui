import { Button } from "@/components/ui/button";
import { toast, Toaster } from "@/components/ui/toast";

/* Its own Toaster (id "soft"), so these toasts don't land in the site's default one. */
export default function ToastSoftDemo() {
	const options = { toasterId: "soft" };
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Toaster id="soft" variant="soft" position="top-center" />
			<Button variant="soft" tone="success" onClick={() => toast.success("Village deployed", { ...options, description: "Konoha is live on rasengan.dev." })}>
				Success
			</Button>
			<Button variant="soft" tone="info" onClick={() => toast.info("New nature", { ...options, description: "Onmyōton is out: black and white." })}>
				Info
			</Button>
			<Button variant="soft" tone="warning" onClick={() => toast.warning("Builds running low", { ...options, description: "82% of this month's builds used." })}>
				Warning
			</Button>
			<Button variant="soft" tone="destructive" onClick={() => toast.error("Couldn't deploy", { ...options, description: "The build failed at step 3." })}>
				Error
			</Button>
		</div>
	);
}
