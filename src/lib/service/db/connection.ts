import { env } from '$env/dynamic/private';
import type Database from '$src/models/Database'; // this is the Database interface we defined earlier
import { Kysely, PostgresDialect } from 'kysely';
import pkg from 'pg';

const { Pool } = pkg;

const dialect = new PostgresDialect({
	pool: new Pool({
		database: env.DB_NAME,
		host: env.DB_HOST,
		user: env.DB_USER,
		port: Number(env.DB_PORT),
		password: env.DB_PASSWORD,
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
