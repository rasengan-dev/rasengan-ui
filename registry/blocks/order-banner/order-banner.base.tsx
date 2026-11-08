import { MessageCircleIcon, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { OrderBannerContent } from "./schema";

const digits = (number: string) => number.replace(/[^0-9]/g, "");

/** A WhatsApp chat with the business, opened with the content's message. */
const whatsappUrl = (number: string, message?: string) => `https://wa.me/${digits(number)}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/**
 * A band in the primary colour (its text the primary's foreground, as the contract pairs them): the headline, how
 * ordering works, and a WhatsApp button and a phone link. Centred; the buttons stack in a narrow container. Every
 * colour on the band is that pair at full strength, the one pair checked both ways in every village.
 */
export function OrderBanner({ content = example, id = "order", className, headingLevel = 2 }: BlockProps<OrderBannerContent>) {
	const Heading = heading(headingLevel);
	const { whatsapp, phone } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="order-banner" className={cn("@container px-4 py-12", className)}>
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-xl bg-primary px-6 py-12 text-center text-primary-foreground @2xl:px-12 @2xl:py-16">
				<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
					{content.headline}
				</Heading>
				{content.subline && <p className="max-w-2xl text-balance @2xl:text-lg">{content.subline}</p>}
				<div className="flex w-full flex-col gap-3 @md:w-auto @md:flex-row">
					{whatsapp && (
						<Button
							size="lg"
							className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
							render={<a href={whatsappUrl(whatsapp.number, whatsapp.message)} target="_blank" rel="noreferrer" />}
							nativeButton={false}
						>
							<MessageCircleIcon aria-hidden="true" />
							{whatsapp.label}
							<span className="tabular-nums">{whatsapp.number}</span>
						</Button>
					)}
					{phone && (
						<Button
							size="lg"
							variant="outline"
							className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
							render={<a href={`tel:+${digits(phone.number)}`} />}
							nativeButton={false}
						>
							<PhoneIcon aria-hidden="true" />
							{phone.label}
							<span className="tabular-nums">{phone.number}</span>
						</Button>
					)}
				</div>
				{content.note && <p className="text-sm">{content.note}</p>}
			</div>
		</section>
	);
}
