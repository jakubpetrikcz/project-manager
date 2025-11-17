import { z } from 'zod';

import {
  BADGE_VARIANT,
  BadgeVariant,
} from '../components/ui/Badge/BadgeVariants';

export const newTagSchema = z.object({
  name: z.string().min(2).max(10),
  color: z.enum(Object.keys(BADGE_VARIANT) as [BadgeVariant]),
});

export const tagSchema = newTagSchema.extend({
  gid: z.string(),
});

export type TagSchema = z.infer<typeof tagSchema>;
