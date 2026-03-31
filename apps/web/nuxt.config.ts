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
		plugins: [tailwindcss()],
	},

	nitro: {
		preset: 'cloudflare_pages_static',
		prerender: {
			crawlLinks: true,
			routes: ['/'],
		},
	},

	app: {
		head: {
			htmlAttrs: { lang: 'sv' },
			title: 'Danske Bylag — Poul Meyer (1949)',
			meta: [
				{
					name: 'description',
					content:
						'Danske Bylag av Poul Meyer (1949) — original dansk text, svensk översättning och sammanfattning.',
				},
			],
		},
	},

	modules: ['@primevue/nuxt-module'],

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
