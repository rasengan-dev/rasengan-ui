import { FolderOpenIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function EmptyDemo() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<FolderOpenIcon />
				</EmptyMedia>
				<EmptyTitle>No projects yet</EmptyTitle>
				<EmptyDescription>Create a project to start building with your team.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="flex gap-2">
					<Button>
						<PlusIcon /> New project
					</Button>
					<Button variant="outline">Import</Button>
				</div>
				<Button variant="link" size="sm" render={<a href="#docs" />}>
					Read the guide
				</Button>
			</EmptyContent>
		</Empty>
	);
}
