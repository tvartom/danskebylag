import { createDatabase } from '@repo/database/client'
import type { H3Event } from 'h3'

export function useDB(event: H3Event) {
	return createDatabase(event.context.cloudflare.env.DB as D1Database)
}
