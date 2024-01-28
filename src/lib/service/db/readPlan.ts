import { db } from './connection';

export async function dbReadPlan(goalId: string) {
	// @ts-expect-error goalId should be a UUID
	const query = db.selectFrom('plans').where('goal_id', '=', goalId);
	return await query.selectAll().execute();
}
