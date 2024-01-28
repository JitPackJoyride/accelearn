import { dbReadGoals } from '$src/lib/service/db/readGoals';

export const load = async ({ params }) => {
	const userId = decodeURIComponent(params.userId);
	const goals = await dbReadGoals(userId);
	return { goals, userId };
};
