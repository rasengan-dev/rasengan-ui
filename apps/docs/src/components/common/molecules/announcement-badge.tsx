import { Link } from "rasengan";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { announcesList } from "@/data/announces";

export const AnnouncementBadge = () => {
	return (
		<Link to={announcesList[0].link}>
			<Badge
				variant='default'
				className='text-sm bg-muted text-foreground border border-border px-4 py-1 rounded-full'
			>
				<span className="text-xs">{announcesList[0].label}</span>
				<ArrowRight />
			</Badge>
		</Link>
	);
};
