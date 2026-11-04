"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";
import { sliderStyles, sliderVariants, type SliderVariantProps } from "./slider.styles";

export { sliderVariants } from "./slider.styles";

export type SliderProps = Omit<SliderPrimitive.Root.Props, "className"> & SliderVariantProps & { className?: string };

/**
 * One thumb per value: a number gives one, an array (a range) gives as many. The thumbs are
 * the inputs, so an aria-label on the slider names them ("… start" and "… end" for a range).
 */
export function Slider({ className, tone, size, defaultValue, value, min = 0, max = 100, "aria-label": label, ...props }: SliderProps) {
	const values = React.useMemo(() => {
		const current = value ?? defaultValue;
		return Array.isArray(current) ? current : [current ?? min];
	}, [value, defaultValue, min]);
	const thumbLabel = label ? (index: number) => (values.length > 1 ? `${label} ${index === 0 ? "start" : "end"}` : label) : undefined;

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			data-tone={tone ?? "primary"}
			data-size={size ?? "default"}
			className={cn(sliderVariants({ tone, size }), className)}
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			{...props}
		>
			<SliderPrimitive.Control data-slot="slider-control" className={sliderStyles.control}>
				<SliderPrimitive.Track data-slot="slider-track" className={sliderStyles.track}>
					<SliderPrimitive.Indicator data-slot="slider-range" className={sliderStyles.indicator} />
					{values.map((_, index) => (
						<SliderPrimitive.Thumb
							key={index}
							index={index}
							getAriaLabel={thumbLabel}
							data-slot="slider-thumb"
							className={sliderStyles.thumb}
						/>
					))}
				</SliderPrimitive.Track>
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}
