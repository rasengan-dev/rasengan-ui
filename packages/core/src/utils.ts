import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Joins class names and lets the last Tailwind utility win (installed as `@/lib/utils`, like shadcn). */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
