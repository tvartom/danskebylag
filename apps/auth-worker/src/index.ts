import { WorkerEntrypoint } from 'cloudflare:workers'
import type { AuthPayload } from '@repo/shared'
import type { Env } from './env.d.js'

/**
 * Auth Worker - Provides authentication RPC methods
 *
 * This worker demonstrates:
 * 1. WorkerEntrypoint for RPC exposure
 * 2. Typed RPC methods callable from other workers
 * 3. Simple token-based authentication
 */
export default class AuthWorker extends WorkerEntrypoint<Env> {
	/**
	 * HTTP fetch handler (minimal - mainly for health checks)
	 */
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url)

		if (url.pathname === '/health') {
			return Response.json({ status: 'ok', worker: 'auth-worker' })
		}

		// This worker is primarily used via RPC, not direct HTTP
		return Response.json({ error: 'Use this worker via service binding RPC' }, { status: 400 })
	}

	/**
	 * RPC Method: Verify a token
	 * Called by other workers via service binding
	 *
	 * @param token - The token to verify
	 * @returns Verification result with user info if valid
	 */
	async verifyToken(token: string): Promise<{
		valid: boolean
		userId?: string
		email?: string
		roles?: string[]
	}> {
		try {
			// In a real app, you'd verify a JWT or check a session store
			// This is a simplified example

			if (!token || token.length < 10) {
				return { valid: false }
			}

			// Decode the "token" (in reality, verify JWT signature)
			const payload = this.decodeToken(token)

			if (!payload) {
				return { valid: false }
			}

			// Check expiration
			if (payload.exp && payload.exp < Date.now() / 1000) {
				return { valid: false }
			}

			return {
				valid: true,
				userId: payload.userId,
				email: payload.email,
				roles: payload.roles,
			}
		} catch {
			return { valid: false }
		}
	}

	/**
	 * RPC Method: Generate a token for a user
	 * Called by other workers via service binding
	 *
	 * @param userId - The user ID
	 * @param email - The user's email
	 * @param roles - The user's roles
	 * @returns A signed token
	 */
	async generateToken(userId: string, email: string, roles: string[] = []): Promise<string> {
		const payload: AuthPayload = {
			userId,
			email,
			roles,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
		}

		// In a real app, sign with JWT
		// This is a simplified base64 encoding for demonstration
		return btoa(JSON.stringify(payload))
	}

	/**
	 * RPC Method: Refresh a token
	 * Called by other workers via service binding
	 */
	async refreshToken(token: string): Promise<{ token: string } | { error: string }> {
		const result = await this.verifyToken(token)

		if (!result.valid || !result.userId || !result.email) {
			return { error: 'Invalid token' }
		}

		const newToken = await this.generateToken(result.userId, result.email, result.roles ?? [])
		return { token: newToken }
	}

	/**
	 * RPC Method: Invalidate a token (logout)
	 * In a real app, you'd add to a blocklist or delete from session store
	 */
	async invalidateToken(_token: string): Promise<{ success: boolean }> {
		// In a real implementation:
		// - Add token to blocklist in KV
		// - Or delete session from D1/KV
		return { success: true }
	}

	/**
	 * Private helper to decode a token
	 */
	private decodeToken(token: string): AuthPayload | null {
		try {
			return JSON.parse(atob(token)) as AuthPayload
		} catch {
			return null
		}
	}
}

// Export for type inference in other workers
export type { AuthWorker }
