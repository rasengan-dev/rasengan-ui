import { z } from "zod";

import { cta } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(32).optional(),
	headline: z.string().min(6).max(80).describe("What the place or the product is, in a few words."),
	subline: z.string().max(180).optional(),
	primary: cta,
	secondary: cta.optional(),
	video: z.object({
		src: z.string().min(1).describe("A short muted loop (MP4, H.264), 10 to 20 seconds, under 4 MB."),
		poster: z.string().min(1).describe("A still of the video (a path): shown before it plays, and instead of it with reduced motion."),
		label: z.string().min(1).max(80).describe("What the video shows, for screen readers."),
	}),
	labels: z.object({
		play: z.string().min(1).max(24).describe("'Play the video'"),
		pause: z.string().min(1).max(24).describe("'Pause the video'"),
	}),
});

export type HeroVideoContent = z.infer<typeof schema>;
