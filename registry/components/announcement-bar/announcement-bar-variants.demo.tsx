import { AnnouncementBar } from "@/components/ui/announcement-bar";

/** Solid in a tone, the small size, and a message that scrolls (with its pause button). */
export default function AnnouncementBarVariantsDemo() {
	return (
		<div className="flex w-full flex-col gap-3">
			<AnnouncementBar variant="solid" className="rounded-lg">
				Free delivery in Douala on orders over 15 000 XAF. <a href="#order">Order now</a>
			</AnnouncementBar>
			<AnnouncementBar size="sm" tone="success" className="rounded-lg">
				Open on Christmas Day, from noon.
			</AnnouncementBar>
			<AnnouncementBar scrolling tone="neutral" className="rounded-lg" label="Shipping news">
				<span>New: same-day delivery in Yaoundé</span>
				<span>Gift cards from 10 000 XAF</span>
				<span>Closed on 1 January</span>
			</AnnouncementBar>
		</div>
	);
}
