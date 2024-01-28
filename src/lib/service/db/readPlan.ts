import { db } from './connection';

export async function dbReadPlan(goalId: string) {
	const query = db
		.selectFrom('goals')
		// @ts-expect-error goalId should be a UUID
		.where('goals.id', '=', goalId)
		.innerJoin('plans', 'plans.goal_id', 'goals.id');
	return await query.selectAll().execute();
}
