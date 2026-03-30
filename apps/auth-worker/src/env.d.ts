/// <reference types="@cloudflare/workers-types" />

export interface Env {
	ENVIRONMENT: string
	JWT_SECRET: string
	// SESSIONS: KVNamespace  // Uncomment when using KV
}
