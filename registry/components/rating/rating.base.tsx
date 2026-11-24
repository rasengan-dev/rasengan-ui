"use client";

import * as React from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ratingStyles, ratingVariants, type RatingVariantProps } from "./rating.styles";

export { ratingVariants, type RatingVariantProps } from "./rating.styles";

export interface RatingProps extends React.HTMLAttributes<HTMLSpanElement>, RatingVariantProps {
	/** The score, from 0 to `max`. Stars are filled to the tenth. */
	value: number;
	max?: number;
	/** Writes the score beside the stars ("4.7"). */
	showValue?: boolean;
	/** The language the score is written in. */
	locale?: string;
	/** What a screen reader hears. By default "4.7 out of 5". */
	label?: string;
}

/**
 * A score shown as stars, filled to the tenth: "4.7 out of 5" to a screen reader. When the score is already written
 * beside it in the page, pass `aria-hidden` and the stars are decoration only.
 */
export function Rating({ value, max = 5, showValue = false, locale = "en", label, tone, size, className, ...props }: RatingProps) {
	const score = Math.max(0, Math.min(max, value));
	const written = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(score);
	const hidden = props["aria-hidden"] === true || props["aria-hidden"] === "true";
	return (
		<span
			data-slot="rating"
			role={hidden ? undefined : "img"}
			aria-label={hidden ? undefined : (label ?? `${written} out of ${max}`)}
			className={cn(ratingVariants({ tone, size }), className)}
			{...props}
		>
			<span className={ratingStyles.stars}>
				{Array.from({ length: max }, (_, i) => {
					const fill = Math.round(Math.max(0, Math.min(1, score - i)) * 10) / 10;
					return (
						<span key={i} className={ratingStyles.star}>
							<StarIcon aria-hidden="true" className={ratingStyles.empty} fill="currentColor" strokeWidth={0} />
							{fill > 0 && (
								<StarIcon
									aria-hidden="true"
									className={ratingStyles.full}
									fill="currentColor"
									strokeWidth={0}
									style={{ "--rating-empty": `${(1 - fill) * 100}%` } as React.CSSProperties}
								/>
							)}
						</span>
					);
				})}
			</span>
			{showValue && (
				<span aria-hidden="true" className={ratingStyles.value}>
					{written}
				</span>
			)}
		</span>
	);
}

export interface RatingGroupProps
	extends Omit<RadioGroupPrimitive.Props, "className" | "value" | "defaultValue" | "onValueChange">,
		RatingVariantProps {
	className?: string;
	value?: number | null;
	defaultValue?: number | null;
	onValueChange?: (value: number) => void;
	max?: number;
	/** What a screen reader hears for each star. By default "1 star", "2 stars"… */
	starLabel?: (stars: number) => string;
}

/**
 * Stars as an input: a group of radios, one per star, that posts a whole number under `name`. Arrow keys move and pick,
 * hovering previews the score. Name the group with `aria-label` or a Field's label ("Your rating").
 */
export function RatingGroup({
	value: controlled,
	defaultValue = null,
	onValueChange,
	max = 5,
	starLabel = (stars) => (stars === 1 ? "1 star" : `${stars} stars`),
	tone,
	size,
	className,
	...props
}: RatingGroupProps) {
	const [inner, setInner] = React.useState<number | null>(defaultValue);
	const [preview, setPreview] = React.useState<number | null>(null);
	const value = controlled === undefined ? inner : controlled;
	const shown = preview ?? value ?? 0;
	return (
		<RadioGroupPrimitive
			data-slot="rating-group"
			value={value}
			onValueChange={(next) => {
				setInner(next as number);
				onValueChange?.(next as number);
			}}
			onPointerLeave={() => setPreview(null)}
			className={cn(ratingVariants({ tone, size }), ratingStyles.group, className)}
			{...props}
		>
			{Array.from({ length: max }, (_, i) => (
				<RadioPrimitive.Root
					key={i}
					value={i + 1}
					aria-label={starLabel(i + 1)}
					data-slot="rating-group-item"
					className={ratingStyles.item}
					onPointerEnter={(event) => event.pointerType === "mouse" && setPreview(i + 1)}
				>
					<StarIcon aria-hidden="true" data-filled={i < shown ? "" : undefined} className={ratingStyles.icon} />
				</RadioPrimitive.Root>
			))}
		</RadioGroupPrimitive>
	);
}
