import type Database from '$src/models/Database'; // this is the Database interface we defined earlier
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const dialect = new PostgresDialect({
	pool: new Pool({
		database: process.env['DB_NAME'],
		host: process.env['DB_HOST'],
		user: process.env['DB_USER'],
		port: Number(process.env['DB_PORT']),
		password: process.env['DB_PASSWORD'],
		ssl: true,
		max: 10
	})
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
	dialect
});