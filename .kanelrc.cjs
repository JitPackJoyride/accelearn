const { makeKyselyHook } = require('kanel-kysely');

/** @type {import('kanel').Config} */
const config = {
	connection: {
		host: process.env['DB_HOST'],
		user: process.env['DB_USER'],
		password: process.env['DB_PASSWORD'],
		database: process.env['DB_NAME'],
		ssl: true
	},

	preDeleteOutputFolder: true,
	outputPath: './src/models',

	customTypeMap: {
		'pg_catalog.tsvector': 'string',
		'pg_catalog.bpchar': 'string'
	},

	preRenderHooks: [makeKyselyHook()]
};

module.exports = config;
