import { describe, expect, it } from 'vitest'
import { errorResponse, generateId, sleep, successResponse } from './utils.js'

describe('successResponse', () => {
	it('should return success true with data', () => {
		const result = successResponse({ id: 1, name: 'test' })
		expect(result).toEqual({
			success: true,
			data: { id: 1, name: 'test' },
		})
	})

	it('should work with primitive values', () => {
		expect(successResponse('hello')).toEqual({ success: true, data: 'hello' })
		expect(successResponse(42)).toEqual({ success: true, data: 42 })
		expect(successResponse(null)).toEqual({ success: true, data: null })
	})
})

describe('errorResponse', () => {
	it('should return success false with error message', () => {
		const result = errorResponse('Something went wrong')
		expect(result).toEqual({
			success: false,
			error: 'Something went wrong',
		})
	})
})

describe('sleep', () => {
	it('should delay execution', async () => {
		const start = Date.now()
		await sleep(50)
		const elapsed = Date.now() - start
		expect(elapsed).toBeGreaterThanOrEqual(45)
	})
})

describe('generateId', () => {
	it('should return a UUID string', () => {
		const id = generateId()
		expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
	})

	it('should generate unique IDs', () => {
		const ids = new Set([generateId(), generateId(), generateId()])
		expect(ids.size).toBe(3)
	})
})
