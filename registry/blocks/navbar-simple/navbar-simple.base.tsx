"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { BlockProps } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { NavbarSimpleContent } from "./schema";

/**
 * The page's top bar: the name, the links, a quiet and a main action. When its container is narrower than `@3xl`, the
 * links and the quiet action move into a sheet behind a menu button. Make it sticky with
 * `className="sticky top-0 z-40"`. It has no heading, so `headingLevel` is unused.
 */
export function NavbarSimple({ content = example, id = "top", className }: BlockProps<NavbarSimpleContent>) {
	const { brand, links, secondary, primary } = content;
	return (
		<header id={id} data-slot="block" data-block="navbar-simple" className={cn("@container border-b bg-background/90 backdrop-blur-sm", className)}>
			<div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
				<a href={brand.href} className="flex items-center gap-2 rounded-control font-display font-semibold tracking-display outline-none focus-visible:focus-ring">
					{brand.logo && <img src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={brand.logo.height} className="size-7" />}
					{brand.name}
				</a>
				<nav aria-label={brand.name} className="hidden @3xl:block">
					<ul className="flex items-center gap-1">
						{links.map((link) => (
							<li key={link.href}>
								<Button variant="ghost" size="sm" className="text-muted-foreground" render={<a href={link.href} />} nativeButton={false}>
									{link.label}
								</Button>
							</li>
						))}
					</ul>
				</nav>
				<div className="ms-auto flex items-center gap-2">
					{secondary && (
						<Button variant="ghost" size="sm" className="hidden @3xl:inline-flex" render={<a href={secondary.href} />} nativeButton={false}>
							{secondary.label}
						</Button>
					)}
					<Button size="sm" render={<a href={primary.href} />} nativeButton={false}>
						{primary.label}
					</Button>
					<Sheet>
						<SheetTrigger render={<Button variant="ghost" size="icon-sm" className="@3xl:hidden" aria-label={content.menuLabel} />}>
							<MenuIcon aria-hidden="true" />
						</SheetTrigger>
						<SheetContent side="right" className="w-72">
							<SheetHeader>
								<SheetTitle>{brand.name}</SheetTitle>
							</SheetHeader>
							<nav aria-label={brand.name} className="px-4">
								<ul className="flex flex-col gap-1">
									{links.map((link) => (
										<li key={link.href}>
											<Button variant="ghost" className="w-full justify-start" render={<a href={link.href} />} nativeButton={false}>
												{link.label}
											</Button>
										</li>
									))}
									{secondary && (
										<li>
											<Button variant="ghost" className="w-full justify-start" render={<a href={secondary.href} />} nativeButton={false}>
												{secondary.label}
											</Button>
										</li>
									)}
								</ul>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
