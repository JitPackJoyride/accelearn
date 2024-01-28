import { dbReadPlan } from '$lib/service/db/readPlan';
import { aiPlanSchema } from '$src/lib/service/ai/plan.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { goalId } = params;
	const plans = await dbReadPlan(goalId);
	try {
		return {
			plan: {
				...plans[0],
				skills: aiPlanSchema.shape.skills.parse(plans[0]?.skills)
			}
		};
	} catch (e) {
		error(500, { message: 'Failed to parse plan skills' });
		throw e;
	}
};
