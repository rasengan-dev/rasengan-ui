import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sizes = { sm: "Small", default: "Default", lg: "Large" } as const;

export default function TabsSizesDemo() {
	return (
		<div className="grid justify-items-start gap-4">
			{(Object.keys(sizes) as (keyof typeof sizes)[]).map((size) => (
				<Tabs key={size} size={size} defaultValue="week">
					<TabsList aria-label={`${sizes[size]} range`}>
						<TabsTrigger value="day">{sizes[size]}</TabsTrigger>
						<TabsTrigger value="week">Week</TabsTrigger>
						<TabsTrigger value="month">Month</TabsTrigger>
					</TabsList>
				</Tabs>
			))}
		</div>
	);
}
