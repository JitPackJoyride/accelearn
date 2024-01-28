import { z } from 'zod';
import { aiAxiosInstance } from './axios';

export const aiPlanSchema = z.object({
	skills: z.array(
		z.object({
			name: z.string(),
			description: z.string(),
			date: z.string()
		})
	)
});

export async function aiPlan(data: {
	skill: string;
	current_capability: string;
	target_capability: string;
	start_date: string;
	end_date: string;
	email?: string;
}) {
	const response = await aiAxiosInstance.post<unknown>('/route', { ...data });
	if (response.status !== 200) {
		throw new Error(`aiPlan failed with status ${response.status}`);
	}
	const planData = aiPlanSchema.safeParse(response.data);
	if (!planData.success) {
		console.error(planData.error.issues);
		return null;
	}
	return planData.data;
}
