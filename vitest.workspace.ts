import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
	{
		test: {
			name: 'shared',
			root: './packages/shared',
			include: ['src/**/*.test.ts'],
		},
	},
	{
		test: {
			name: 'database',
			root: './packages/database',
			include: ['src/**/*.test.ts'],
		},
	},
])
