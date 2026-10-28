import type { CSSProperties, ReactNode } from "react";

export interface MarqueeProps {
	children: ReactNode;
	/** Seconds for one full loop. */
	duration?: number;
	/** Space between items, any CSS length. */
	gap?: string;
	/** Describes the list for screen readers, e.g. "Companies using Lumen". */
	label?: string;
	className?: string;
}

/**
 * An infinite horizontal loop (logos, short quotes). Pure CSS: it pauses on
 * hover and focus, and stands still under reduced motion and in the "off" and
 * "final" modes (tokens.css). The second copy is hidden from assistive tech
 * and out of the tab order.
 */
export function Marquee({ children, duration = 30, gap = "3rem", label, className }: MarqueeProps) {
	// Each copy carries its own trailing gap, so translating by -50% loops seamlessly.
	const copy: CSSProperties = { display: "flex", alignItems: "center", gap, paddingInlineEnd: gap, flexShrink: 0 };
	return (
		<div
			className={["rui-marquee", className].filter(Boolean).join(" ")}
			role={label ? "region" : undefined}
			aria-label={label}
			style={{
				overflow: "hidden",
				maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
				["--marquee-duration" as string]: `${duration}s`,
			}}
		>
			<div className="rui-marquee-track" style={{ display: "flex", width: "max-content" }}>
				<div style={copy}>{children}</div>
				{/* inert as well as hidden: links in the copy must not be a second tab stop. */}
				<div style={copy} aria-hidden="true" inert>
					{children}
				</div>
			</div>
		</div>
	);
}
