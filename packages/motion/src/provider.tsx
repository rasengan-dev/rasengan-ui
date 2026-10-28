import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { MotionContext } from "./context";
import { defaultMotionTokens, type MotionIntensity, type MotionMode, type MotionTokens } from "./tokens";

/**
 * Runs before first paint (put it in <head>): decides the page's motion mode
 * and writes it on <html data-motion>. Hidden initial states in tokens.css
 * only apply when the mode is "ready", so without JavaScript content stays
 * visible. ?motion=final|off forces a mode (screenshots, tests, agents).
 */
export const motionScript = `(function(){try{var d=document.documentElement,p=new URLSearchParams(location.search).get("motion"),m=p||d.getAttribute("data-motion");if(m==="final"||m==="off"){d.setAttribute("data-motion",m);return}if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-motion","off");return}d.setAttribute("data-motion","ready")}catch(e){}})();`;

export function MotionScript({ nonce }: { nonce?: string }) {
	return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: motionScript }} />;
}

/** The mode <MotionScript /> chose, or the same decision taken now if the script is absent. */
function readMotionMode(): Exclude<MotionMode, "pending"> {
	const root = document.documentElement;
	const current = root.getAttribute("data-motion");
	if (current === "ready" || current === "final" || current === "off") return current;
	const forced = new URLSearchParams(window.location.search).get("motion");
	const mode =
		forced === "final" || forced === "off"
			? forced
			: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
				? "off"
				: "ready";
	root.setAttribute("data-motion", mode);
	return mode;
}

export interface MotionProviderProps {
	/** 0–3. Usually the art direction's intensity. */
	intensity?: MotionIntensity;
	tokens?: Partial<MotionTokens>;
	children: ReactNode;
}

/** Put once at the app root. Motion and GSAP primitives read their settings from it. */
export function MotionProvider({ intensity = 2, tokens, children }: MotionProviderProps) {
	const [mode, setMode] = useState<MotionMode>("pending");

	useEffect(() => {
		setMode(readMotionMode());
		// Primitives now own hidden states: turns off the CSS failsafe (tokens.css).
		document.documentElement.setAttribute("data-motion-hydrated", "");
	}, []);

	const settings = useMemo(
		() => ({ mode, intensity, tokens: { ...defaultMotionTokens, ...tokens } }),
		[mode, intensity, tokens],
	);

	return (
		<MotionContext.Provider value={settings}>
			<MotionConfig reducedMotion="user">
				<LazyMotion features={domAnimation}>{children}</LazyMotion>
			</MotionConfig>
		</MotionContext.Provider>
	);
}
