import { Badge } from "@/components/ui/badge";
import { Loader, Send, Sparkle } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn, sleep } from "@/lib/utils";

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

export const Faq4 = () => {
	const messageRef = useRef<HTMLDivElement>(null);

	const [category, setCategory] = useState(faqs[0].category);
	const [formOpen, setFormOpen] = useState(false);
	const [sending, setSending] = useState(false);

	const faqsByCategory = useMemo(() => {
		return faqs.filter((faq) => faq.category === category);
	}, [category]);

	const categories = useMemo(() => {
		const categories: string[] = [];

		faqs.forEach((faq) => {
			if (!categories.includes(faq.category)) {
				categories.push(faq.category);
			}
		});

		return categories;
	}, []);

	const handleSend = async () => {
		if (!messageRef.current) return;

		setSending(true);
		// setFormOpen(false);

		await sleep(1500);

		setSending(false);

		// reset form
		messageRef.current.blur();
		messageRef.current.textContent = "";
	};

	return (
		<section className='w-full max-w-[1000px] mx-auto flex flex-col items-center mt-20 px-4'>
			<Badge variant={"outline"} className='rounded-full px-4 py-2 gap-2'>
				<Sparkle size={16} className='text-yellow-500' />
				<span>Ask us</span>
			</Badge>
			<h2 className='text-4xl font-bold mt-2 text-foreground text-center text-pretty'>
				Frequently Asked Questions
			</h2>
			<p className='text-center text-muted-foreground mt-2 font-medium'>
				Get the answer you need to navigate our platform with confidence
			</p>

			<div className='mt-20 w-full flex gap-4'>
				<div className='flex flex-col items-start w-[300px] gap-2'>
					{categories.map((cat, index) => (
						<Button
							key={index}
							variant={cat === category ? "default" : "outline"}
							className={cn(
								"rounded-full w-[140px] px-4 py-2",
								cat !== category && "bg-transparent text-foreground"
							)}
							onClick={() => {
								setCategory(cat);
								setFormOpen(false);
							}}
						>
							{cat}
						</Button>
					))}
				</div>

				<Accordion type='single' collapsible className='w-full'>
					{faqsByCategory.map((faq) => (
						<AccordionItem
							key={faq.id}
							value={faq.id.toString()}
							className='text-foreground border rounded-xl px-4 mb-4'
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
