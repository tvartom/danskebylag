/**
 * Common types used across the monorepo
 */

export interface ApiResponse<T> {
	success: boolean
	data?: T
	error?: string
}

export interface PaginatedResponse<T> {
	items: T[]
	total: number
	page: number
	pageSize: number
	hasMore: boolean
}

export interface AuthPayload {
	userId: string
	email: string
	roles: string[]
	exp: number
}
