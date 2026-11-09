"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Integration, Logo } from "@/lib/block-fields";
import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { IntegrationsOrbitContent } from "./schema";

/** Seconds for a full turn: slow enough to read the logos, and the outer ring a little slower. */
const TURN = { inner: 70, outer: 100 };

function Mark({ logo, className }: { logo?: Logo; className?: string }) {
	const name = logo?.name ?? "";
	return (
		<span className={cn("flex items-center justify-center overflow-hidden rounded-full border-village bg-card shadow-md", className)}>
			{logo?.src ? (
				<img src={logo.src} alt="" width={logo.width ?? 96} height={logo.height ?? 96} loading="lazy" className="size-3/5 object-contain" />
			) : (
				<span className="font-display font-semibold">{name.slice(0, 2)}</span>
			)}
		</span>
	);
}

/**
 * One ring: a dashed circle and its logos, spaced evenly, each placed by angle at the ring's radius (`--ring`, set by
 * the wrapper in the orbit's `cqi`) and kept upright as the ring turns.
 */
function Ring({ items, size, offset }: { items: Integration[]; size: number; offset: number }) {
	return (
		<div data-ring className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full border-(length:--border-width) border-dashed" style={{ width: `${size}%`, height: `${size}%` }}>
			{items.map((item, index) => {
				const angle = offset + (360 / items.length) * index;
				return (
					<span
						key={item.name}
						className="absolute top-1/2 left-1/2"
						style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(var(--ring) * -1)) rotate(${-angle}deg)` } as CSSProperties}
					>
						<span data-upright className="block">
							<Mark logo={item.logo ?? { name: item.name }} className="size-12 @md/orbit:size-14" />
						</span>
					</span>
				);
			})}
		</div>
	);
}

/**
 * Integrations as an orbit: your product at the centre, the tools on two rings around it, turning slowly (the Web
 * Animations API, the logos counter-turning to stay upright) with a pause button; still with motion off or at
 * intensity 0. The orbit is decoration for the eye: below `@md`, and for screen readers at every width, the tools are
 * a plain list with their categories.
 */
export function IntegrationsOrbit({ content = example, id = "integrations", className, headingLevel = 2 }: BlockProps<IntegrationsOrbitContent>) {
	const Heading = heading(headingLevel);
	const orbit = useRef<HTMLDivElement>(null);
	const { allows, measured } = useMotion(orbit);
	const [paused, setPaused] = useState(false);
	const animations = useRef<Animation[]>([]);
	const moving = measured && allows(1);
	const inner = content.integrations.slice(0, 4);
	const outer = content.integrations.slice(4);

	useEffect(() => {
		const root = orbit.current;
		if (!root || !moving) return;
		const turn = (element: Element, seconds: number, direction: 1 | -1) =>
			element.animate([{ rotate: "0deg" }, { rotate: `${360 * direction}deg` }], { duration: seconds * 1000, iterations: Infinity });
		const rings = [...root.querySelectorAll("[data-ring]")];
		animations.current = rings.flatMap((ring, index) => {
			const seconds = index === 0 ? TURN.inner : TURN.outer;
			const direction = index === 0 ? 1 : -1;
			return [turn(ring, seconds, direction), ...[...ring.querySelectorAll("[data-upright]")].map((logo) => turn(logo, seconds, direction === 1 ? -1 : 1))];
		});
		return () => {
			for (const animation of animations.current) animation.cancel();
			animations.current = [];
		};
	}, [moving, content.integrations]);

	useEffect(() => {
		for (const animation of animations.current) paused ? animation.pause() : animation.play();
	}, [paused]);

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="integrations-orbit" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<div className="relative mx-auto mt-12 hidden w-full max-w-xl @md:block">
					<div
						ref={orbit}
						aria-hidden="true"
						className="@container/orbit relative aspect-square w-full"
					>
						<div className="absolute inset-0 [--ring:28cqi]">
							<Ring items={inner} size={56} offset={20} />
						</div>
						{outer.length > 0 && (
							<div className="absolute inset-0 [--ring:46cqi]">
								<Ring items={outer} size={92} offset={-10} />
							</div>
						)}
						<div className="absolute top-1/2 left-1/2 flex size-28 -translate-1/2 items-center justify-center rounded-full tone-primary bg-tone text-tone-foreground shadow-lg">
							{content.product.src ? (
								<img src={content.product.src} alt="" width={content.product.width ?? 96} height={content.product.height ?? 96} className="size-1/2 object-contain" />
							) : (
								<span className="font-display text-lg font-semibold">{content.product.name}</span>
							)}
						</div>
					</div>
					{moving && (
						<Button variant="ghost" size="icon-sm" className="absolute end-0 bottom-0" aria-pressed={paused} aria-label={content.labels.pause} onClick={() => setPaused((value) => !value)}>
							{paused ? <PlayIcon /> : <PauseIcon />}
						</Button>
					)}
				</div>
				<ul className="mt-10 grid grid-cols-2 gap-3 @md:sr-only">
					{content.integrations.map((item) => (
						<li key={item.name} className="flex items-center gap-3 rounded-lg border-village p-3">
							<Mark logo={item.logo ?? { name: item.name }} className="size-10 shrink-0 shadow-none" />
							<span className="flex flex-col">
								<span className="font-medium">{item.name}</span>
								{item.category && <span className="text-sm text-muted-foreground">{item.category}</span>}
							</span>
						</li>
					))}
				</ul>
				{content.cta && (
					<div className="mt-10 flex justify-center">
						<Button variant="outline" render={<a href={content.cta.href} />} nativeButton={false}>
							{content.cta.label}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
