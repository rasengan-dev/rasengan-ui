import { Badge } from "@/components/ui/badge";
import { useComponentStore } from "@/store/components"
import { Link } from "rasengan";
import Pagination from "./pagination";

export default function ComponentList() {
	const { getComponentsType } = useComponentStore();

	const componentsType = getComponentsType();

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mt-12">
			{
				componentsType.map((type) => (
					<Link to={`/docs/components/${type.category}/${type.label}`}>
						<article key={type.label} className="border dark:border-input rounded-md px-4 py-2 flex items-center justify-center gap-4 text-sm text-foreground hover:cursor-pointer hover:border-primary dark:hover:border-primary hover:text-primary hover:font-semibold hover:[&_.badge]:border-primary hover:[&_.badge]:text-primary transition-all duration-300">
							<span>{type.name}</span>
							<Badge className="px-2 py-0 size-6 rounded-full text-[10px] badge" variant={"outline"}>{type.components.length}</Badge>
						</article>
					</Link>
				))
			}

			<Pagination
				next={{
					to: `/docs/components/${componentsType[0].category}/${componentsType[0].label}`,
					label: componentsType[0].name,
				}}
			/>
		</div>
	)
}