/**
 * Common utility functions
 */

/**
 * Creates a successful API response
 */
export function successResponse<T>(data: T): { success: true; data: T } {
	return { success: true, data }
}

/**
 * Creates an error API response
 */
export function errorResponse(error: string): { success: false; error: string } {
	return { success: false, error }
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generate a simple unique ID
 */
export function generateId(): string {
	return crypto.randomUUID()
}
