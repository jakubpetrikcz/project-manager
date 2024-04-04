import { z } from "zod";

import { BadgeTypeEnum } from "../components/atoms";

export const newTagSchema = z.object({
	name: z.string().min(2).max(10),
	color: z.nativeEnum(BadgeTypeEnum),
});

export const tagSchema = newTagSchema.extend({
	gid: z.string(),
});

export type NewTagSchema = z.infer<typeof newTagSchema>;
export type TagSchema = z.infer<typeof tagSchema>;
