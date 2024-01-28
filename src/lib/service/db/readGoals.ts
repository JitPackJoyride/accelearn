import { db } from './connection';

export async function dbReadGoals(userId: string) {
	const query = db
		.selectFrom('users')
		.where('users.phone', 'like', userId)
		.innerJoin('goals', 'goals.user_id', 'users.id');
	return await query.selectAll().execute();
}
