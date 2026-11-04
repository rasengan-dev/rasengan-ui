import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const variants = { default: "Default", underline: "Underline", pills: "Pills" } as const;

export default function TabsVariantsDemo() {
	return (
		<div className="grid gap-6">
			{(Object.keys(variants) as (keyof typeof variants)[]).map((variant) => (
				<Tabs key={variant} variant={variant} defaultValue="overview">
					<TabsList aria-label={`${variants[variant]} tabs`}>
						<TabsTrigger value="overview">{variants[variant]}</TabsTrigger>
						<TabsTrigger value="deploys">Deploys</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
					</TabsList>
				</Tabs>
			))}
		</div>
	);
}
