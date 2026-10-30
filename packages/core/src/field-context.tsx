"use client";

import * as React from "react";

/*
 * What a Field passes down to the control inside it (Input, Textarea, a Select's trigger): its size and
 * variant, so `<Field size="sm" variant="filled">` styles the control without repeating the props.
 * Installed as `@/lib/field-context`; a control's own props win over the Field's.
 */

export type FieldSize = "sm" | "default" | "lg";
export type FieldVariant = "default" | "filled" | "underline";

export interface FieldLook {
	size?: FieldSize | null;
	variant?: FieldVariant | null;
}

const FieldContext = React.createContext<FieldLook>({});

export function FieldLookProvider({ size, variant, children }: FieldLook & { children?: React.ReactNode }) {
	const value = React.useMemo(() => ({ size, variant }), [size, variant]);
	return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>;
}

/** The control's size and variant: its own props, else the nearest Field's. */
export function useFieldLook<V extends string = FieldVariant>(own: { size?: FieldSize | null; variant?: V | null }) {
	const field = React.useContext(FieldContext);
	return {
		size: own.size ?? field.size ?? undefined,
		variant: (own.variant ?? field.variant ?? undefined) as V | FieldVariant | undefined,
	};
}
