import { dbAxiosInstance } from './axios';

export async function dbCreateGoal(data: {
	skill: string;
	current_capability: string;
	target_capability: string;
	start_date: string;
	end_date: string;
}) {
	const response = await dbAxiosInstance.post<unknown>('/goals', { ...data });
	if (response.status !== 200) {
		throw new Error(`Creating a goal failed with status ${response.status}`);
	}
	return { success: true };
}
