import { AnnouncementBar, AnnouncementBarClose } from "@/components/ui/announcement-bar";

/** Closes for this page: with a `dismissKey`, it would stay closed on the next visits. */
export default function AnnouncementBarDemo() {
	return (
		<div className="w-full overflow-hidden rounded-lg border-village">
			<AnnouncementBar>
				The winter menu is here: braised fish and plantain, every evening. <a href="#menu">See the menu</a>
				<AnnouncementBarClose />
			</AnnouncementBar>
			<div className="h-24 bg-background" />
		</div>
	);
}
