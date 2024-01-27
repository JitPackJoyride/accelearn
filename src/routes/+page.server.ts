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
		return {
			form
		};
	}
};
