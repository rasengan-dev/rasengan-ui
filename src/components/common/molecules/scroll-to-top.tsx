// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "rasengan";

export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		console.log({ pathname, window });

		// Scroll to the top on every route change
		window.scrollTo(0, 0);
	}, [pathname]);

	return null; // This component doesn’t render anything
}
