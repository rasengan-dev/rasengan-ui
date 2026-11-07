"use client";

import * as React from "react";

/*
 * VillageScope (RFC-0002, "Scoping"): gives part of a page its own village,
 * nature, tint or scheme. Installed as `@/lib/village-scope`.
 *
 * Popups (dialog, menu, tooltip) render in a portal on <body>, outside the
 * scope, so they would wear the page's village. The scope therefore keeps a
 * twin in <body>: an element with `display: contents` and the same
 * attributes, which components use as their portal container. Popups
 * inherit the scope's tokens there without being clipped by its overflow or
 * repositioned by its transforms.
 */

export interface VillageSettings {
	/** A village name, as in the CSS files: "konoha", "kiri", "iwa"… */
	village?: string;
	/** A nature name: "katon", "suiton", "onmyoton"… */
	nature?: string;
	tint?: "village" | "neutral";
	/** Leave it out to follow the page (the `.dark` class on an ancestor). */
	scheme?: "light" | "dark";
	/** Overrides the village's motion intensity (RFC-0007): 0 none, 1 fades only, 2 travel, 3 showcase. */
	motionIntensity?: 0 | 1 | 2 | 3;
}

interface ScopeContext {
	settings: VillageSettings;
	container: HTMLElement | null;
}

const Context = React.createContext<ScopeContext | null>(null);

/** The element popups should portal into: the nearest scope's twin, or undefined for <body>. */
export function usePortalContainer(): HTMLElement | undefined {
	return React.useContext(Context)?.container ?? undefined;
}

function attributes(settings: VillageSettings) {
	return {
		"data-village": settings.village,
		"data-nature": settings.nature,
		"data-tint": settings.tint,
		"data-motion-intensity": settings.motionIntensity === undefined ? undefined : String(settings.motionIntensity),
	} as const;
}

export type VillageScopeProps = VillageSettings &
	Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
		/** The element to render, `div` by default. */
		as?: React.ElementType;
		children?: React.ReactNode;
	};

export function VillageScope({ village, nature, tint, scheme, motionIntensity, as: Element = "div", className, children, ...props }: VillageScopeProps) {
	const parent = React.useContext(Context);
	// A nested scope inherits what it does not set, so its twin in <body> wears the same tokens.
	const settings: VillageSettings = {
		village: village ?? parent?.settings.village,
		nature: nature ?? parent?.settings.nature,
		tint: tint ?? parent?.settings.tint,
		scheme: scheme ?? parent?.settings.scheme,
		motionIntensity: motionIntensity ?? parent?.settings.motionIntensity,
	};
	const [container, setContainer] = React.useState<HTMLElement | null>(null);

	React.useEffect(() => {
		const twin = document.createElement("div");
		twin.dataset.slot = "village-scope-portal";
		twin.style.display = "contents";
		document.body.appendChild(twin);
		setContainer(twin);
		return () => {
			twin.remove();
			setContainer(null);
		};
	}, []);

	React.useEffect(() => {
		if (!container) return;
		for (const [name, value] of Object.entries(attributes(settings))) {
			if (value) container.setAttribute(name, value);
			else container.removeAttribute(name);
		}
		container.classList.toggle("dark", settings.scheme === "dark");
		container.classList.toggle("light", settings.scheme === "light");
	}, [container, settings.village, settings.nature, settings.tint, settings.scheme, settings.motionIntensity]);

	const value = React.useMemo(
		() => ({ settings, container }),
		[container, settings.village, settings.nature, settings.tint, settings.scheme, settings.motionIntensity],
	);
	const schemeClass = scheme === "dark" ? "dark" : scheme === "light" ? "light" : undefined;

	return (
		<Context.Provider value={value}>
			<Element
				data-slot="village-scope"
				{...attributes({ village, nature, tint, motionIntensity })}
				className={[schemeClass, className].filter(Boolean).join(" ") || undefined}
				{...props}
			>
				{children}
			</Element>
		</Context.Provider>
	);
}
