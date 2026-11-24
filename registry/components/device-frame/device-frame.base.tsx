import type * as React from "react";
import { LockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { deviceFrameStyles, deviceFrameVariants, type DeviceFrameVariantProps } from "./device-frame.styles";

export { deviceFrameVariants, type DeviceFrameVariantProps } from "./device-frame.styles";

export interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement>, DeviceFrameVariantProps {
	/** The address shown in the browser's bar: 'senbon.app/invoices'. Decoration: the screenshot's `alt` says what it shows. */
	url?: string;
}

/**
 * A browser window or a phone around what it holds: a screenshot (`<img>`), a video, or live markup. The chrome (dots,
 * address bar, island) is drawn with the contract and hidden from screen readers; the content keeps its own `alt`.
 */
export function DeviceFrame({ variant = "browser", url, className, children, ...props }: DeviceFrameProps) {
	if (variant === "phone") {
		return (
			<div data-slot="device-frame" data-variant="phone" className={cn(deviceFrameVariants({ variant }), className)} {...props}>
				<div className={deviceFrameStyles.phoneScreen}>
					<span aria-hidden="true" className={deviceFrameStyles.island} />
					{children}
					<span aria-hidden="true" className={deviceFrameStyles.homeBar} />
				</div>
			</div>
		);
	}
	return (
		<div data-slot="device-frame" data-variant="browser" className={cn(deviceFrameVariants({ variant }), className)} {...props}>
			<div aria-hidden="true" className={deviceFrameStyles.bar}>
				<span className={deviceFrameStyles.dots}>
					<span />
					<span />
					<span />
				</span>
				<span className={deviceFrameStyles.address}>
					{url && (
						<>
							<LockIcon />
							<span className="truncate">{url}</span>
						</>
					)}
				</span>
				<span className="w-12 shrink-0" />
			</div>
			<div className={deviceFrameStyles.browserScreen}>{children}</div>
		</div>
	);
}
