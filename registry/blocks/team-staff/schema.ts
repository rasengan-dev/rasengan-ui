import { z } from "zod";

import { staffMember } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Meet the team', 'Our barbers'."),
	subline: z.string().max(160).optional(),
	members: z.array(staffMember).min(2).max(8).describe("Portraits (4:5) read best; each can have its own booking link."),
});

export type TeamStaffContent = z.infer<typeof schema>;
