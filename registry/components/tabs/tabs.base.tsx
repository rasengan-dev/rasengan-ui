import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";
import { tabsStyles } from "./tabs.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

export function Tabs({ className, ...props }: Props<TabsPrimitive.Root.Props>) {
	return <TabsPrimitive.Root data-slot="tabs" className={cn(tabsStyles.root, className)} {...props} />;
}

export function TabsList({ className, ...props }: Props<TabsPrimitive.List.Props>) {
	return <TabsPrimitive.List data-slot="tabs-list" className={cn(tabsStyles.list, className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: Props<TabsPrimitive.Tab.Props>) {
	return <TabsPrimitive.Tab data-slot="tabs-trigger" className={cn(tabsStyles.tab, className)} {...props} />;
}

export function TabsContent({ className, ...props }: Props<TabsPrimitive.Panel.Props>) {
	return <TabsPrimitive.Panel data-slot="tabs-content" className={cn(tabsStyles.panel, className)} {...props} />;
}
