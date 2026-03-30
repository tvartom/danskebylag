import { users } from '@repo/database/schema'

export default defineEventHandler(async (event) => {
	const db = useDB(event)
	const allUsers = await db.select().from(users)
	return allUsers
})
