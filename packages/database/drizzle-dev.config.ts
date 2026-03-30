import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	out: './drizzle',
	schema: './src/schema/index.ts',
	dialect: 'sqlite',

	// Local development database (relative to this config file)
	// Find the actual file path under .wrangler/state/v3/d1/ after running migrations
	dbCredentials: {
		url: 'file:../../.wrangler/state/v3/d1/miniflare-D1DatabaseObject/<HASH>.sqlite',
	},
})
