import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "rasengan";

export const SidebarBanner = () => {
	return (
		<div className='h-15 w-full border-b-[1px] border-b-border bg-background px-4 flex items-center gap-4'>
			<Button size={"icon"} variant={"ghost"} className='text-foreground/70'>
				<AlignLeft />
			</Button>

			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to='/components'>Components</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to='/marketing'>Marketing</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Hero Sections</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};
