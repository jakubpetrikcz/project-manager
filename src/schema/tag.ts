import { z } from "zod";
import { BadgeType } from "../components/atoms";

export const tagSchema = z.object({
	name: z.string().min(2).max(10),
	color: z.nativeEnum(BadgeType),
});

export type TagSchema = z.infer<typeof tagSchema>;
