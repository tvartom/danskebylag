/// <reference types="@cloudflare/workers-types" />

import type { AuthWorker } from '@repo/auth-worker'

export interface Env {
	DB: D1Database
	AUTH: Service<AuthWorker>
	ENVIRONMENT: string
}
