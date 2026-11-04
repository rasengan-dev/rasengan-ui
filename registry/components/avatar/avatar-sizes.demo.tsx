import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sizes = ["sm", "default", "lg", "xl"] as const;

export default function AvatarSizesDemo() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			{sizes.map((size) => (
				<Avatar key={size} size={size}>
					<AvatarFallback>NU</AvatarFallback>
				</Avatar>
			))}
		</div>
	);
}
