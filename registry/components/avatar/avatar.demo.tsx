import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";

const team = ["NU", "SH", "SA", "KK"];

export default function AvatarDemo() {
	return (
		<div className="flex flex-wrap items-center gap-8">
			<div className="flex items-center gap-3">
				<Avatar size="lg">
					<AvatarFallback className="bg-primary text-primary-foreground">NU</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarFallback>SA</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarFallback>SH</AvatarFallback>
				</Avatar>
			</div>
			<AvatarGroup aria-label="Team 7, 7 members">
				{team.map((initials) => (
					<Avatar key={initials}>
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				))}
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>
		</div>
	);
}
