import { dbReadGoals } from '$src/lib/service/db/readGoals';

export const load = async ({ params }) => {
	const userId = decodeURIComponent(params.userId);
	console.log('userId', userId);
	const goals = await dbReadGoals();
	return { goals };
};
