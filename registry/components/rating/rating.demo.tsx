import { Rating } from "@/components/ui/rating";

/** A score, read-only: the stars filled to the tenth, the number beside them. */
export default function RatingDemo() {
	return (
		<div className="flex flex-col items-start gap-3">
			<Rating value={4.7} showValue size="lg" />
			<Rating value={3.2} showValue />
			<Rating value={5} size="sm" />
		</div>
	);
}
