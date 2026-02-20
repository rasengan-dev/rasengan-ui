import { useEffect, useState } from "react";

export const useScroll = () => {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return scroll;
};
