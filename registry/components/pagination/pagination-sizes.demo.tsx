import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const sizes = ["sm", "default", "lg"] as const;

export default function PaginationSizesDemo() {
	return (
		<div className="grid gap-4">
			{sizes.map((size) => (
				<Pagination key={size} size={size} aria-label={`Pagination (${size})`}>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious aria-disabled="true" />
						</PaginationItem>
						{[1, 2, 3].map((page) => (
							<PaginationItem key={page}>
								<PaginationLink href={`#${size}-${page}`} isActive={page === 1}>
									{page}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext href={`#${size}-2`} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			))}
		</div>
	);
}
