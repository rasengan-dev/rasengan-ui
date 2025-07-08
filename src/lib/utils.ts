import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function scrollToSection(
	e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	id: string
) {
	e.preventDefault();

	const element = document.getElementById(id);
	element?.scrollIntoView({ behavior: "smooth" });

	history.pushState(null, "", `#${id}`); // Update the URL
}
