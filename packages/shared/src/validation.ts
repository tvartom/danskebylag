import { z } from 'zod'

/**
 * User validation schemas
 */
export const createUserSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
	email: z.email('Invalid email address'),
})

export const updateUserSchema = z.object({
	name: z.string().min(1).max(100).optional(),
	email: z.email().optional(),
})

export const userIdSchema = z.object({
	id: z.coerce.number().int().positive('ID must be a positive integer'),
})

/**
 * Post validation schemas
 */
export const createPostSchema = z.object({
	title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
	content: z.string().min(1, 'Content is required'),
	authorId: z.number().int().positive('Author ID must be a positive integer'),
})

export const updatePostSchema = z.object({
	title: z.string().min(1).max(200).optional(),
	content: z.string().min(1).optional(),
})

export const postIdSchema = z.object({
	id: z.coerce.number().int().positive('ID must be a positive integer'),
})

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().positive().max(100).default(20),
})

/**
 * Type exports
 */
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type PaginationInput = z.infer<typeof paginationSchema>
