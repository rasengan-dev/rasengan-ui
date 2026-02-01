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
import { Input } from "@/components/ui/input";

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

export const Faq5 = () => {
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
		<section className='w-full max-w-[1300px] mx-auto flex flex-col items-center mt-20 px-4'>
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

			<div className='w-full flex flex-col md:flex-row gap-8 mt-20'>
				<div className='w-full md:w-[60%] flex flex-col gap-4'>
					<div className='flex items-start w-full gap-2'>
						{categories.map((cat, index) => (
							<Button
								key={index}
								variant={cat === category ? "default" : "outline"}
								className={cn(
									"rounded-full px-4 py-2",
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

				<div className='w-full md:w-[40%]'>
					<div className='w-full h-auto flex flex-col items-center border rounded-xl p-8'>
						<div className='w-full h-auto flex flex-col'>
							<h1 className='text-4xl font-medium text-foreground'>Ask us</h1>
							<p className='text-muted-foreground mt-4'>
								We are here to help you!
							</p>
						</div>

						<div className='w-full mt-4'>
							<div>
								<label
									htmlFor='name'
									className='text-sm font-medium text-foreground'
								>
									Name
								</label>
								<Input
									placeholder='Enter your name'
									className='h-12 mt-2 text-foreground'
								/>
							</div>

							<div className='mt-4'>
								<label
									htmlFor='password'
									className='text-sm font-medium text-foreground'
								>
									Message
								</label>
								<div
									className={cn(
										"mt-2 relative rounded-2xl border w-full h-auto bg-background dark:bg-transparent mx-auto"
									)}
								>
									<div
										ref={messageRef}
										contentEditable
										data-placeholder={"Ask us anything"}
										className='w-full min-h-[55px] max-h-[200px] h-auto empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
									></div>
									<div className='flex items-center justify-end p-2'>
										<Button className='rounded-xl' onClick={handleSend}>
											{sending ? (
												<Loader className='mr-2 h-4 w-4 animate-spin' />
											) : (
												<Send size={18} />
											)}
											<span>{sending ? "Sending..." : "Send"}</span>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
