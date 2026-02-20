import { useComponentStore } from "@/store/components";
import { Link } from "rasengan";
import { useMemo } from "react";

type Props = {
	previous?: {
		to: string,
		label: string
	},

	next?: {
		to: string,
		label: string
	},

	currentPageLabel?: string
}

export default function Pagination({ previous, next, currentPageLabel }: Props) {
	const { getNavigation } = useComponentStore();

	const { previous: previousPage, next: nextPage } = useMemo(() => {
		if (!currentPageLabel) {
			return {
				previous,
				next
			}
		}

		const navigation = getNavigation();
		let nextPage: { to: string, label: string } | undefined = undefined;
		let previousPage: { to: string, label: string } | undefined = undefined;

		for (const section of navigation) {
			for (let index = 0; index < section.items.length; index++) {
				const item = section.items[index];

				if (item.to.includes(currentPageLabel)) {
					if (index === 0) {
						nextPage = {
							to: section.items[index + 1].to,
							label: section.items[index + 1].label
						};
					} else if (index === section.items.length - 1) {
						previousPage = {
							to: section.items[index - 1].to,
							label: section.items[index - 1].label
						};
					} else {
						nextPage = {
							to: section.items[index + 1].to,
							label: section.items[index + 1].label
						};
						previousPage = {
							to: section.items[index - 1].to,
							label: section.items[index - 1].label
						};
					}

					break;
				}
			}
		}

		return { previous: previousPage, next: nextPage }

	}, [currentPageLabel])

	return (
		<div className="w-full mt-16">
			<div className="flex items-center justify-between pt-6">
				{
					previousPage && (
						<Link to={previousPage.to} className="hover:[&_span.link]:underline underline-offset-4">
							<div className="flex flex-col gap-2">
								<span className="text-xs font-medium text-foreground/70">Previous</span>
								<span className="link font-semibold text-sm text-foreground">{previousPage.label}</span>
							</div>
						</Link>
					)
				}

				{
					nextPage && (
						<Link to={nextPage.to} className="hover:[&_span.link]:underline underline-offset-4 ml-auto">
							<div className="flex flex-col gap-2">
								<span className="text-xs font-medium text-foreground/70 text-right">Next</span>
								<span className="link font-semibold text-sm text-right text-foreground">{nextPage.label}</span>
							</div>
						</Link>
					)
				}
			</div>
		</div>
	)
}