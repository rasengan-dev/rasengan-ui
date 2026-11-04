import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function BreadcrumbSeparatorsDemo() {
	return (
		<Breadcrumb aria-label="Project path">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="#acme">acme</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>/</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink href="#web">web</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>/</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>settings</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
