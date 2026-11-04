import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationDemo() {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#page-1" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#page-1">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#page-2" isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#page-3">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#page-12">12</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#page-3" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
