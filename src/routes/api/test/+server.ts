import { aiRealistic } from '$src/lib/service/ai/realistic';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	await aiRealistic({
		skill: 'Baking',
		current_capability: 'Can open my oven',
		target_capability: 'Bake a cake for my mom',
		start_date: '2024-01-28T00:00:00.000Z',
		end_date: '2024-05-05T00:00:00.000Z'
	});
	return json({});
};
