import { WorkerEntrypoint } from 'cloudflare:workers'
import { createDatabase, schema } from '@repo/database'
import { errorResponse, successResponse } from '@repo/shared'
import { eq } from 'drizzle-orm'
import type { Env } from './env.d.js'

/**
 * API Worker with RPC methods
 *
 * This worker demonstrates:
 * 1. HTTP request handling
 * 2. D1 database access via Drizzle
 * 3. Calling another worker via Service Binding (RPC)
 */
export default class ApiWorker extends WorkerEntrypoint<Env> {
	/**
	 * Handle HTTP requests
	 */
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url)
		const path = url.pathname

		try {
			// GET /users - List all users
			if (path === '/users' && request.method === 'GET') {
				const users = await this.getUsers()
				return Response.json(successResponse(users))
			}

			// POST /users - Create a user
			if (path === '/users' && request.method === 'POST') {
				const body = await request.json<{ name: string; email: string }>()
				const user = await this.createUser(body.name, body.email)
				return Response.json(successResponse(user), { status: 201 })
			}

			// GET /protected - Example of calling auth worker
			if (path === '/protected' && request.method === 'GET') {
				const token = request.headers.get('Authorization')?.replace('Bearer ', '')

				if (!token) {
					return Response.json(errorResponse('No token provided'), { status: 401 })
				}

				// Call auth worker via RPC
				const authResult: { valid: boolean; userId?: string } = await this.env.AUTH.verifyToken(token)

				if (!authResult.valid) {
					return Response.json(errorResponse('Invalid token'), { status: 401 })
				}

				return Response.json(
					successResponse({
						message: 'Access granted',
						userId: authResult.userId,
					}),
				)
			}

			// Health check
			if (path === '/health') {
				return Response.json({ status: 'ok', worker: 'api-worker' })
			}

			return Response.json(errorResponse('Not found'), { status: 404 })
		} catch (error) {
			console.error('API Error:', error)
			return Response.json(errorResponse('Internal server error'), { status: 500 })
		}
	}

	/**
	 * RPC method: Get all users
	 * Can be called by other workers via service binding
	 */
	async getUsers() {
		const db = createDatabase(this.env.DB)
		return db.select().from(schema.users)
	}

	/**
	 * RPC method: Create a new user
	 * Can be called by other workers via service binding
	 */
	async createUser(name: string, email: string) {
		const db = createDatabase(this.env.DB)
		const [user] = await db.insert(schema.users).values({ name, email }).returning()
		return user
	}

	/**
	 * RPC method: Get user by ID
	 * Can be called by other workers via service binding
	 */
	async getUserById(id: number) {
		const db = createDatabase(this.env.DB)
		const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id))
		return user ?? null
	}
}

// Export the worker class for type inference in other workers
export type { ApiWorker }
