import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const variants = { outline: "Outline", separated: "Separated" } as const;

export default function AccordionVariantsDemo() {
	return (
		<div className="grid w-full max-w-2xl items-start gap-8 sm:grid-cols-2">
			{(Object.keys(variants) as (keyof typeof variants)[]).map((variant) => (
				<Accordion key={variant} variant={variant} defaultValue={["village"]}>
					<AccordionItem value="village">
						<AccordionTrigger>{variants[variant]}</AccordionTrigger>
						<AccordionContent>A whole design language, switched at runtime.</AccordionContent>
					</AccordionItem>
					<AccordionItem value="nature">
						<AccordionTrigger>And a nature?</AccordionTrigger>
						<AccordionContent>The accent hue, from katon to onmyōton.</AccordionContent>
					</AccordionItem>
				</Accordion>
			))}
		</div>
	);
}
