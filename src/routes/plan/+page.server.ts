import { aiPlanSchema } from '$lib/service/ai/plan.js';
import { error } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const skillsJson = url.searchParams.get('skills');
	if (!skillsJson) {
		return error(404);
	}
	const skillsObj = JSON.parse(skillsJson);
	const skills = aiPlanSchema.shape.skills.safeParse(skillsObj);
	if (!skills.success) {
		return error(404);
	}
	return {
		skills: skills.data
	};
};
