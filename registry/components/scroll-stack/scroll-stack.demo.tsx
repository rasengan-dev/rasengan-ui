import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";

export const steps = [
	{ title: "Tell us about the business", text: "A name, what you sell, where you are. Two minutes." },
	{ title: "Pick a look", text: "A village and a colour. Every page follows them." },
	{ title: "Add your photos and prices", text: "Straight from your phone; we crop and size them." },
	{ title: "Publish", text: "Your site is online on its own address, and you can change it any time." },
];

/** Scroll the page: each card sticks under the one before it. */
export default function ScrollStackDemo() {
	return (
		<ScrollStack className="w-full max-w-xl [--stack-top:6rem]">
			{steps.map((step, index) => (
				<ScrollStackItem key={step.title}>
					<article className="flex min-h-56 flex-col justify-between gap-6 rounded-lg border-village bg-background p-6 shadow-md">
						<span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
						<div className="flex flex-col gap-2">
							<h3 className="m-0 font-display text-2xl font-semibold tracking-display case-heading">{step.title}</h3>
							<p className="m-0 text-muted-foreground">{step.text}</p>
							<a href="#" className="w-fit text-sm font-medium text-tone-text tone-primary underline-offset-4 outline-none hover:underline focus-visible:focus-ring">
								Learn more
							</a>
						</div>
					</article>
				</ScrollStackItem>
			))}
		</ScrollStack>
	);
}
