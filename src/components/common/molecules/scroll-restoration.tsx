import { useEffect, useRef } from "react";
import { useLocation } from "rasengan";

// Store scroll positions globally (per location.key)
const scrollPositions: Record<string, number> = {};

export function ScrollRestoration() {
	const location = useLocation();
	const keyRef = useRef(location.key);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const prevKey = keyRef.current;

		// Save scroll position of the previous page
		if (prevKey) {
			scrollPositions[prevKey] = window.scrollY;
		}

		// Restore scroll position of the new page (default to 0 if not stored)
		const storedY = scrollPositions[location.key] ?? 0;
		window.scrollTo(0, storedY);

		// Update ref
		keyRef.current = location.key;
	}, [location.key]);

	return null;
}
