import { z } from 'zod';
import { aiAxiosInstance } from './axios';

export const aiRealisticSchema = z.object({
	is_realistic: z.boolean(),
	estimated_date: z.string(),
	reasoning: z.string()
});

export async function aiRealistic(data: {
	skill: string;
	current_capability: string;
	target_capability: string;
	start_date: string;
	end_date: string;
	email?: string;
}) {
	const response = await aiAxiosInstance.post<unknown>('/reality', { ...data });
	if (response.status !== 200) {
		throw new Error(`aiPlan failed with status ${response.status}`);
	}
	const isRealistic = aiRealisticSchema.safeParse(response.data);
	if (!isRealistic.success) {
		console.error(isRealistic.error.issues);
		return null;
	}
	return isRealistic.data;
}
