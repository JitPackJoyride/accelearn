import { aiPlan } from '$lib/service/ai/plan';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { goalSchema } from './goalSchema';

export const load = async () => {
	return {
		form: await superValidate(goalSchema)
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, goalSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		console.log('form is valid', form.data);
		const planData = await aiPlan({
			skill: form.data.skill,
			target_capability: form.data.targetLevel,
			start_date: new Date(form.data.startDate).toISOString(),
			end_date: new Date(form.data.endDate).toISOString(),
			current_capability: form.data.currentLevel
		});
		return {
			form,
			planData
		};
	}
};
