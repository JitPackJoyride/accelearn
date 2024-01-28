import { dbReadPlan } from '$lib/service/db/readPlan';

export const load = async ({ params }) => {
	const { goalId } = params;
	const plans = await dbReadPlan(goalId);
	return { plan: plans[0] };
};
