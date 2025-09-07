import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsList } from "@/data/faqs";

export default function FaqSection() {
	return (
		<section className='w-full pt-20'>
			<div className='p-4 w-full border-y-[1px] border-y-border'>
				<h1 className='text-[50px] leading-[60px] text-start max-w-[700px] text-foreground text-pretty'>
					FAQ
				</h1>
				<p className='max-w-[500px] text-start mt-2 text-foreground text-pretty'>
					Here are some frequently asked questions about our premium components
					and features.
				</p>
			</div>

			<div className='w-full flex flex-col justify-start items-center min-h-[200px] py-20'>
				<Accordion type='single' collapsible className='w-full max-w-[800px]'>
					{faqsList.map((faq) => {
						return (
							<AccordionItem
								value={faq.id.toString()}
								key={faq.id}
								className='border-[1px] border-border px-4 rounded-lg mb-2 text-foreground [&]:last:border-b-[1px]'
							>
								<AccordionTrigger className='text-md font-medium'>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className='text-sm'>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</div>
		</section>
	);
}
