import { BookOpenIcon, BoxesIcon, PaletteIcon, TerminalIcon } from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const products = [
	{ title: "Components", description: "Forty-one components on Base UI.", href: "#components", icon: BoxesIcon },
	{ title: "Villages", description: "Whole design languages, switched at runtime.", href: "#villages", icon: PaletteIcon },
	{ title: "CLI", description: "Add components and keep them up to date.", href: "#cli", icon: TerminalIcon },
	{ title: "MCP server", description: "Let an agent read and install them.", href: "#mcp", icon: BookOpenIcon },
];

const guides = [
	{ title: "Installation", href: "#installation" },
	{ title: "Theming", href: "#theming" },
	{ title: "Accessibility", href: "#accessibility" },
];

export default function NavigationMenuDemo() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Product</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-1 sm:w-[30rem] sm:grid-cols-2">
							{products.map(({ title, description, href, icon: Icon }) => (
								<li key={title}>
									<NavigationMenuLink href={href}>
										<span className="flex items-center gap-2 font-medium">
											<Icon aria-hidden="true" /> {title}
										</span>
										<span className="text-muted-foreground">{description}</span>
									</NavigationMenuLink>
								</li>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Guides</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-1 sm:w-56">
							{guides.map(({ title, href }) => (
								<li key={title}>
									<NavigationMenuLink href={href}>{title}</NavigationMenuLink>
								</li>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink href="#pricing" className={navigationMenuTriggerStyle()}>
						Pricing
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
