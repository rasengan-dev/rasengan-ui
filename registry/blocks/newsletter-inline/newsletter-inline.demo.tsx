import { NewsletterInline } from "@/components/blocks/newsletter-inline";

/** The docs' preview takes the address itself, so trying the form does not leave the page. */
export default function NewsletterInlineDemo() {
	return <NewsletterInline onSubmit={() => undefined} />;
}
