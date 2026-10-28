import { createContext, useContext } from "react";
import { defaultMotionTokens, type MotionIntensity, type MotionMode, type MotionTokens } from "./tokens";

export interface MotionSettings {
	mode: MotionMode;
	intensity: MotionIntensity;
	tokens: MotionTokens;
}

// Without a provider, primitives still animate with the default tokens.
export const MotionContext = createContext<MotionSettings>({
	mode: "ready",
	intensity: 2,
	tokens: defaultMotionTokens,
});

export function useMotionSettings(): MotionSettings {
	return useContext(MotionContext);
}

/** Whether effects of this intensity should run right now. */
export function shouldAnimate(settings: MotionSettings, minIntensity: MotionIntensity = 1): boolean {
	return settings.mode === "ready" && settings.intensity >= minIntensity;
}
