import { RefObject, useEffect, useState } from "react";

/**
 * Determine whether or not an element is totaly visible in the viewport
 */
export const useObserver = (target: RefObject<HTMLElement | null>) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (!target.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setIsVisible(entry.isIntersecting);
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 1.0,
			}
		);

		observer.observe(target.current);

		return () => {
			observer.disconnect();
		};
	}, [target]);

	return isVisible;
};
