import { db } from './connection';

export async function dbReadGoals() {
	const query = db.selectFrom('goals');
	return await query.selectAll().execute();
}
