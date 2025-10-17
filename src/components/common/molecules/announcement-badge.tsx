import { Link } from "rasengan";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { announcesList } from "@/data/announces";

export const AnnouncementBadge = () => {
	return (
		<Link to={announcesList[0].link}>
			<Badge
				variant='default'
				className='bg-accent/30f text-sm bg-primary px-4 py-1 rounded-full'
			>
				<span>{announcesList[0].label}</span>
				<ArrowRight />
			</Badge>
		</Link>
	);
};
