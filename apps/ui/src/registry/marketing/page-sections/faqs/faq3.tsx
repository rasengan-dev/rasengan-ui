import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "lucide-react";

type Faq = {
	id: number;
	question: string;
	answer: string;
	category: string;
};

export const faqs: Faq[] = [
	{
		id: 1,
		question: "What is Rasengan UI?",
		answer:
			"Rasengan UI is a collection of beautifully crafted, ready-to-use UI sections built for any React app.",
		category: "get started",
	},
	{
		id: 2,
		question: "How do I install the components?",
		answer:
			"You can simply copy the code from our documentation or integrate them directly into your project.",
		category: "get started",
	},
	{
		id: 3,
		question: "Is authentication required to use Rasengan UI?",
		answer:
			"No authentication is required to use the components in your projects.",
		category: "get started",
	},
	{
		id: 4,
		question: "Is my payment information secure?",
		answer:
			"Yes, payments are securely processed via Stripe with industry-standard encryption.",
		category: "security",
	},
	{
		id: 5,
		question: "Do you store any sensitive user data?",
		answer:
			"No, we do not store any personal or payment information on our servers.",
		category: "security",
	},
	{
		id: 6,
		question: "Can I use Rasengan UI in commercial projects?",
		answer:
			"Yes, all licenses allow commercial use depending on the tier you choose.",
		category: "purchase",
	},
	{
		id: 7,
		question: "Do you offer refunds?",
		answer:
			"We offer refunds within 7 days if you're not satisfied. Just reach out via email.",
		category: "purchase",
	},
	{
		id: 8,
		question: "Can I upgrade my license later?",
		answer: "Yes, you can upgrade at any time and only pay the difference.",
		category: "purchase",
	},
	{
		id: 9,
		question: "Will the components work in Next.js and Remix?",
		answer:
			"Absolutely. Rasengan UI is designed to work with any React framework including Next.js, Remix, and TanStack.",
		category: "integration",
	},
	{
		id: 10,
		question: "Can I use these components with Tailwind CSS and Shadcn UI?",
		answer:
			"Yes, Rasengan UI is built on Tailwind and Shadcn, making it easy to integrate into projects already using them.",
		category: "integration",
	},
];

export const Faq3 = () => {
	return (
		<section className='w-full min-h-screen max-w-[1000px] mx-auto flex flex-col items-center justifyl-start gap-8 mt-20 px-4 lg:px-20'>
			<div className='w-full flex flex-col items-center'>
				<Badge variant={"outline"} className='rounded-full px-4 py-2 gap-2'>
					<Sparkle size={16} className='text-yellow-500' />
					<span>Ask us</span>
				</Badge>
				<h2 className='text-5xl font-bold mt-2 text-foreground text-center lg:text-left text-pretty'>
					Frequently Asked <span className='text-blue-500'>Questions</span>
				</h2>
				<p className='text-center lg:text-left text-muted-foreground mt-2 font-medium'>
					Get the answer you need to navigate our platform with confidence
				</p>
			</div>

			<div className='mt-10 w-full gap-4'>
				<Accordion
					type='multiple'
					className='w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'
				>
					{faqs.map((faq) => (
						<AccordionItem
							key={faq.id}
							value={faq.id.toString()}
							className='text-foreground border rounded-xl px-4'
						>
							<AccordionTrigger className='font-medium hover:no-underline hover:cursor-pointer text-md transition-all duration-300 ease-in-out '>
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className='text-muted-foreground text-sm font-medium'>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
};
