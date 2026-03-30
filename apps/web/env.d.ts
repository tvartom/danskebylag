/// <reference types="@cloudflare/workers-types" />
/// <reference path="worker-configuration.d.ts" />

declare module 'h3' {
	interface H3EventContext {
		cf: CfProperties
		cloudflare: {
			request: Request
			env: {
				DB: D1Database
				ENVIRONMENT: string
			}
			context: ExecutionContext
		}
	}
}

export {}
