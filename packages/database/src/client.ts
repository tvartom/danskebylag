import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema/index.js'

export type Database = ReturnType<typeof createDatabase>

export function createDatabase(d1: D1Database) {
	return drizzle(d1, { schema })
}

export { schema }
