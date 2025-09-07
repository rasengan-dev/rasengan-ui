import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function scrollToSection(
	e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | null,
	id: string,
	behavior: ScrollBehavior = "smooth"
) {
	if (e) e.preventDefault();

	const element = document.getElementById(id);
	element?.scrollIntoView({ behavior });

	if (e) {
		history.pushState(null, "", `#${id}`); // Update the URL
	}
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const randomId = () => {
	return Math.floor(Math.random() * 1000000);
};
