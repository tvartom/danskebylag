import { users } from '@repo/database/schema'
import { createUserSchema } from '@repo/shared'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const result = createUserSchema.safeParse(body)
	if (!result.success) {
		throw createError({
			statusCode: 400,
			message: result.error.issues.map((e) => e.message).join(', '),
		})
	}

	const db = useDB(event)

	const [newUser] = await db
		.insert(users)
		.values({
			name: result.data.name,
			email: result.data.email,
		})
		.returning()

	return newUser
})
