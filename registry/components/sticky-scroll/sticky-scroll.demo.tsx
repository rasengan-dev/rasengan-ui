import { StickyScroll, StickyScrollItem, StickyScrollList, StickyScrollMedia, StickyScrollStage } from "@/components/ui/sticky-scroll";

const steps = [
	{ title: "Send the quote", text: "Write it once, from your phone; the client gets a link they can accept in one tap.", image: "/placeholders/product-invoice.svg", alt: "A quote with its lines and total, ready to send" },
	{ title: "Get paid", text: "Card, mobile money or transfer: the money lands and the invoice marks itself paid.", image: "/placeholders/product-payment.svg", alt: "A payment screen with card and mobile money" },
	{ title: "See where you stand", text: "One page with what came in, what is late and what to chase this week.", image: "/placeholders/product-dashboard.svg", alt: "A dashboard of payments received and late" },
];

/** Scroll the page: the step in the middle of the screen lights up and its picture takes the stage. */
export default function StickyScrollDemo() {
	return (
		<StickyScroll className="w-full">
			<StickyScrollList>
				{steps.map((step, index) => (
					<StickyScrollItem key={step.title} className="gap-4">
						<div className="flex gap-4">
							<span
								aria-hidden="true"
								className="flex size-9 shrink-0 items-center justify-center rounded-pill border-village font-display font-semibold tabular-nums @3xl:in-data-[layout=staged]:group-data-current/sticky-item:border-transparent @3xl:in-data-[layout=staged]:group-data-current/sticky-item:bg-tone @3xl:in-data-[layout=staged]:group-data-current/sticky-item:tone-primary @3xl:in-data-[layout=staged]:group-data-current/sticky-item:text-tone-foreground"
							>
								{index + 1}
							</span>
							<div className="flex flex-col gap-2">
								<h3 className="m-0 font-display text-xl font-semibold case-heading text-foreground @3xl:in-data-[layout=staged]:text-muted-foreground @3xl:in-data-[layout=staged]:group-data-current/sticky-item:text-foreground">{step.title}</h3>
								<p className="m-0 text-muted-foreground">{step.text}</p>
								<StickyScrollMedia>
									<img src={step.image} alt={step.alt} className="w-full rounded-lg border-village shadow-sm" />
								</StickyScrollMedia>
							</div>
						</div>
					</StickyScrollItem>
				))}
			</StickyScrollList>
			<StickyScrollStage>
				{steps.map((step) => (
					<img key={step.title} src={step.image} alt="" className="w-full rounded-lg border-village shadow-md" />
				))}
			</StickyScrollStage>
		</StickyScroll>
	);
}
