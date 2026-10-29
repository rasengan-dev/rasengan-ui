import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const questions = [
	["accessible", "Is it accessible?", "Yes. Base UI handles the keyboard and the ARIA roles, and every village keeps text at 4.5:1."],
	["styled", "Is it styled?", "Yes. It reads only the village tokens, so the same accordion follows Konoha, Kiri or Iwa."],
	["animated", "Is it animated?", "Its height follows the village's motion tokens, and stays still when you ask for reduced motion."],
];

export default function AccordionDemo() {
	return (
		<Accordion defaultValue={["styled"]} className="max-w-lg">
			{questions.map(([value, question, answer]) => (
				<AccordionItem key={value} value={value}>
					<AccordionTrigger>{question}</AccordionTrigger>
					<AccordionContent>{answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
