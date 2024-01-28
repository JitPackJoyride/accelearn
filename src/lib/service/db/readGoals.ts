import { db } from './connection';

export async function dbReadGoals() {
	return await db.selectFrom('goals');
}
