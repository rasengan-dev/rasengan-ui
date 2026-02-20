import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Converts a file size in bytes to a human-readable string format (KB or MB)
 * @param bytes - The file size in bytes
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns A formatted string with the appropriate unit (B, KB, or MB)
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
	if (bytes === 0) return "0 B";

	// Use 1024 for binary representation (1 KB = 1024 bytes)
	const k = 1000;

	// Don't convert if less than 1 KB
	if (bytes < k) {
		return `${bytes} B`;
	}

	// Convert to KB if less than 1 MB
	if (bytes < Math.pow(k, 2)) {
		return `${(bytes / k).toFixed(decimals)} KB`;
	}

	// Convert to MB
	return `${(bytes / Math.pow(k, 2)).toFixed(decimals)} MB`;
}

/**
 * Truncates a string in the middle and replaces the middle portion with ellipsis
 * @param name - The string to truncate
 * @param maxLength - Maximum length of the resulting string (including ellipsis)
 * @param ellipsis - The string to use as ellipsis (default: "...")
 * @returns Truncated string with ellipsis in the middle
 */
export function truncateMiddle(
	name: string,
	maxLength: number,
	ellipsis: string = "..."
): string {
	// Return original string if it's already shorter than maxLength
	if (name.length <= maxLength) {
		return name;
	}

	// Make sure maxLength is reasonable
	if (maxLength < ellipsis.length + 2) {
		// Need at least enough space for ellipsis + 2 characters (one at each end)
		maxLength = ellipsis.length + 2;
	}

	// Calculate how many characters to keep from beginning and end
	const charsToShow = maxLength - ellipsis.length;
	const frontChars = Math.ceil(charsToShow / 2);
	const backChars = Math.floor(charsToShow / 2);

	// Build the truncated string
	const firstPart = name.substring(0, frontChars);
	const lastPart = name.substring(name.length - backChars);

	return firstPart + ellipsis + lastPart;
}

/**
 * File format types that can be detected
 */
type FileFormat = "IMG" | "PDF" | "VIDEO" | "UNKNOWN";

/**
 * Detects the format of a file based on its extension
 * @param fileName - The name of the file including its extension
 * @returns The detected format: "IMG", "PDF", "VIDEO", or "UNKNOWN"
 */
export function detectFileFormat(fileName: string): FileFormat {
	// Handle empty or invalid input
	if (!fileName || typeof fileName !== "string") {
		return "UNKNOWN";
	}

	// Extract the extension (convert to lowercase for case-insensitive comparison)
	const extension = fileName.split(".").pop()?.toLowerCase() || "";

	// If no extension was found
	if (extension === "") {
		return "UNKNOWN";
	}

	// Image formats
	const imageExtensions = [
		"jpg",
		"jpeg",
		"png",
		"gif",
		"bmp",
		"webp",
		"svg",
		"tiff",
		"ico",
		"heic",
		"raw",
	];
	if (imageExtensions.includes(extension)) {
		return "IMG";
	}

	// PDF format
	if (extension === "pdf") {
		return "PDF";
	}

	// Video formats
	const videoExtensions = [
		"mp4",
		"avi",
		"mov",
		"wmv",
		"flv",
		"mkv",
		"webm",
		"m4v",
		"mpeg",
		"mpg",
		"3gp",
	];
	if (videoExtensions.includes(extension)) {
		return "VIDEO";
	}

	// Default case for unrecognized extensions
	return "UNKNOWN";
}

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const randomId = () => {
	return Math.floor(Math.random() * 1000000);
};
