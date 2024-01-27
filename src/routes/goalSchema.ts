import { getLocalTimeZone, today } from '@internationalized/date';
import { z } from 'zod';

export const goalSchema = z.object({
	skill: z.string().min(1, "You must have a concept or skill you're trying to learn."),
	currentLevel: z.string().min(1, 'You must tell us your current level of the skill.'),
	targetLevel: z.string().min(1, 'You must tell us your target level of the skill.'),
	startDate: z
		.string()
		.refine((v) => v, { message: 'A start date is required.' })
		.default(() => today(getLocalTimeZone()).toString()),
	endDate: z.string().refine((v) => v, { message: 'An end date is required.' })
});
export type GoalSchema = typeof goalSchema;
