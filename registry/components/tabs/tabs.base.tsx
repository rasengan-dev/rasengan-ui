"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";
import { tabsListVariants, tabsStyles, tabsTriggerVariants, type TabsVariantProps } from "./tabs.styles";

export { tabsListVariants, tabsTriggerVariants } from "./tabs.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** The variant and size of the nearest Tabs, read by its list and tabs (a nested Tabs has its own). */
const TabsContext = React.createContext<TabsVariantProps>({});

export function Tabs({ className, variant, size, children, ...props }: Props<TabsPrimitive.Root.Props> & TabsVariantProps) {
	const look = React.useMemo(() => ({ variant, size }), [variant, size]);
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-variant={variant ?? "default"}
			data-size={size ?? "default"}
			className={cn(tabsStyles.root, className)}
			{...props}
		>
			<TabsContext.Provider value={look}>{children}</TabsContext.Provider>
		</TabsPrimitive.Root>
	);
}

export function TabsList({ className, ...props }: Props<TabsPrimitive.List.Props>) {
	const { variant } = React.useContext(TabsContext);
	return <TabsPrimitive.List data-slot="tabs-list" className={cn(tabsListVariants({ variant }), className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: Props<TabsPrimitive.Tab.Props>) {
	const look = React.useContext(TabsContext);
	return <TabsPrimitive.Tab data-slot="tabs-trigger" className={cn(tabsTriggerVariants(look), className)} {...props} />;
}

export function TabsContent({ className, ...props }: Props<TabsPrimitive.Panel.Props>) {
	return <TabsPrimitive.Panel data-slot="tabs-content" className={cn(tabsStyles.panel, className)} {...props} />;
}
