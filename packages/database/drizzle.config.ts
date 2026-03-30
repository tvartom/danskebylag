import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

// For local development, we only need schema generation
// Remote credentials are only required for db:push or db:studio with remote DB
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const databaseId = process.env.CLOUDFLARE_DATABASE_ID
const token = process.env.CLOUDFLARE_D1_TOKEN

const hasRemoteCredentials = accountId && databaseId && token

export default defineConfig({
	out: './drizzle',
	schema: './src/schema/index.ts',
	dialect: 'sqlite',
	// Only use d1-http driver if we have remote credentials
	...(hasRemoteCredentials
		? {
				driver: 'd1-http',
				dbCredentials: {
					accountId,
					databaseId,
					token,
				},
			}
		: {}),
})
