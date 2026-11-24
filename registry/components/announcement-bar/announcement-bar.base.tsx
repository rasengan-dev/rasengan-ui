"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { announcementBarStyles, announcementBarVariants, type AnnouncementBarVariantProps } from "./announcement-bar.styles";

export { announcementBarVariants, type AnnouncementBarVariantProps } from "./announcement-bar.styles";

/** Where dismissed announcements are remembered: a list of their `dismissKey`s, in localStorage. */
const STORAGE = "rasengan-ui:dismissed";

/**
 * For `<head>`, before the page paints: hides the announcements this visitor has closed, so a prerendered page does
 * not show them for a moment before React removes them. Needed only with `dismissKey`.
 */
export const announcementBarScript = `(function(){try{var k=JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE)})||"[]");if(!k.length)return;var s=document.createElement("style");s.textContent=k.map(function(x){return'[data-dismiss-key="'+String(x).replace(/["\\\\]/g,"\\\\$&")+'"]{display:none!important}'}).join("");document.head.appendChild(s)}catch(e){}})();`;

export function AnnouncementBarScript({ nonce }: { nonce?: string }) {
	return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: announcementBarScript }} />;
}

function readDismissed(): string[] {
	try {
		const list = JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
		return Array.isArray(list) ? list.map(String) : [];
	} catch {
		return [];
	}
}

const AnnouncementBarContext = React.createContext<() => void>(() => {});

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLElement>, AnnouncementBarVariantProps {
	/** Remembers a close under this key, in localStorage, so the bar stays closed on the next visits. */
	dismissKey?: string;
	/** Runs the message as a marquee, with its pause button. With reduced motion it stands still and wraps. */
	scrolling?: boolean;
	/** Names the band for screen readers. */
	label?: string;
	/** Called once the bar is closed. */
	onDismiss?: () => void;
}

/**
 * A band across the top of the page: a message and a link, in the tone. Put an AnnouncementBarClose inside to let the
 * visitor close it, for this page, or for good with a `dismissKey` (add `<AnnouncementBarScript />` to `<head>` so a
 * closed bar never shows on load). `scrolling` runs the message as a marquee. It is a labelled section, not a live
 * region: it is there when the page loads, there is nothing to announce.
 */
export function AnnouncementBar({ variant, tone, size, dismissKey, scrolling = false, label = "Announcement", onDismiss, className, children, ...props }: AnnouncementBarProps) {
	const [open, setOpen] = React.useState(true);

	React.useEffect(() => {
		if (dismissKey && readDismissed().includes(dismissKey)) setOpen(false);
	}, [dismissKey]);

	const dismiss = React.useCallback(() => {
		setOpen(false);
		if (dismissKey) {
			try {
				const list = readDismissed();
				if (!list.includes(dismissKey)) localStorage.setItem(STORAGE, JSON.stringify([...list, dismissKey]));
			} catch {
				// Storage blocked: it closes for this page only.
			}
		}
		onDismiss?.();
	}, [dismissKey, onDismiss]);

	if (!open) return null;

	const close = React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === AnnouncementBarClose);
	const message = React.Children.toArray(children).filter((child) => !(React.isValidElement(child) && child.type === AnnouncementBarClose));

	return (
		<section
			aria-label={label}
			data-slot="announcement-bar"
			data-dismiss-key={dismissKey}
			className={cn(announcementBarVariants({ variant, tone, size }), className)}
			{...props}
		>
			<AnnouncementBarContext.Provider value={dismiss}>
				{scrolling ? (
					<Marquee gap="4rem" fade={false} className={announcementBarStyles.marquee}>
						{message}
					</Marquee>
				) : (
					<p className="m-0">{message}</p>
				)}
				{close}
			</AnnouncementBarContext.Provider>
		</section>
	);
}

/** Closes the bar. "Close announcement" to a screen reader unless you name it. */
export function AnnouncementBarClose({ className, children, onClick, "aria-label": label = "Close announcement", ...props }: React.ComponentProps<"button">) {
	const dismiss = React.useContext(AnnouncementBarContext);
	return (
		<button
			type="button"
			data-slot="announcement-bar-close"
			aria-label={label}
			className={cn(announcementBarStyles.close, className)}
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) dismiss();
			}}
			{...props}
		>
			{children ?? <XIcon aria-hidden="true" />}
		</button>
	);
}
