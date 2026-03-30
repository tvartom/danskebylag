// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primeuix/themes/aura'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2026-03-20',

	future: {
		compatibilityVersion: 4,
	},

	devtools: { enabled: true },

	css: ['~/assets/css/main.css'],

	vite: {
		// @ts-expect-error: vite 7 / rollup type mismatch (PluginContextMeta.viteVersion) https://github.com/nuxt/nuxt/issues/34384
		plugins: [tailwindcss()],
	},

	nitro: {
		preset: 'cloudflare_pages',
		// Configure nitro-cloudflare-dev to use shared persist path
		cloudflareDev: {
			persistDir: '../../.wrangler/state/v3',
		},
	},

	modules: ['nitro-cloudflare-dev', '@primevue/nuxt-module'],

	primevue: {
		options: {
			ripple: true,
			theme: {
				preset: Aura,
				options: {
					cssLayer: {
						name: 'primevue',
						order: 'theme, base, primevue',
					},
				},
			},
		},
		components: {
			prefix: 'Prime',
		},
	},

	typescript: {
		strict: true,
		// Disable typeCheck in dev due to vue-tsc/TS 5.9 compatibility issue
		// Type checking still works on build
		typeCheck: false,
	},
})
