import { z } from 'zod';

export const goalSchema = z.object({
	skill: z.string().min(1),
	currentLevel: z.string().min(1),
	targetLevel: z.string().min(1),
	startDate: z.string(),
	endDate: z.string()
});
export type GoalSchema = typeof goalSchema;
