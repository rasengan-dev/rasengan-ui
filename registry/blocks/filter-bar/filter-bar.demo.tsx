import { FilterBar } from "@/components/blocks/filter-bar";
import { ListingCards } from "@/components/blocks/listing-cards";

/** The bar over the cards it filters: both read the page's address. */
export default function FilterBarDemo() {
	return (
		<>
			<FilterBar />
			<ListingCards headingLevel={3} className="pt-0 @3xl:pt-0" />
		</>
	);
}
