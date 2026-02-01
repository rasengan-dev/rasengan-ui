import { useEffect, useState } from "react";

export const useScreen = () => {
	const [screen, setScreen] = useState<"xs" | "sm" | "md" | "lg" | "xl">("lg");

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setScreen("xs");
			} else if (window.innerWidth < 768) {
				setScreen("sm");
			} else if (window.innerWidth < 1024) {
				setScreen("md");
			} else if (window.innerWidth < 1280) {
				setScreen("lg");
			} else {
				setScreen("xl");
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return screen;
};
