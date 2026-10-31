import { SearchXIcon, UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function EmptyVariantsDemo() {
	return (
		<div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<SearchXIcon />
					</EmptyMedia>
					<EmptyTitle>No results</EmptyTitle>
					<EmptyDescription>Nothing matches “zzz”. Try fewer words.</EmptyDescription>
				</EmptyHeader>
			</Empty>
			<Empty variant="outline">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<UploadIcon />
					</EmptyMedia>
					<EmptyTitle>Drop files here</EmptyTitle>
					<EmptyDescription>PNG, JPG or PDF, up to 10 MB.</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button variant="outline" size="sm">
						Browse files
					</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
}
