// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primeuix/themes/aura'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2026-03-20',

	future: {
		compatibilityVersion: 4,
	},

	devtools: { enabled: true },

	css: ['primeicons/primeicons.css', '~/assets/css/main.css'],

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
			link: [
				{
					rel: 'apple-touch-icon',
					href: '/apple-touch-icon-180x180.png',
					sizes: '180x180',
				},
			],
		},
	},

	modules: ['@primevue/nuxt-module', '@vite-pwa/nuxt'],

	primevue: {
		options: {
			ripple: true,
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: false,
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

	pwa: {
		registerType: 'autoUpdate',
		strategies: 'generateSW',
		manifest: {
			name: 'Danske Bylag — Poul Meyer (1949)',
			short_name: 'Danske Bylag',
			description:
				'Danske Bylag av Poul Meyer (1949) — original dansk text, svensk översättning och sammanfattning.',
			theme_color: '#1e293b',
			background_color: '#ffffff',
			display: 'standalone',
			orientation: 'portrait',
			lang: 'sv',
			icons: [
				{
					src: 'pwa-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: 'pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: 'pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable',
				},
			],
		},
		workbox: {
			globPatterns: ['**/*.{js,mjs,css,html,ico,png,svg,woff,woff2}'],
			maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
			runtimeCaching: [
				{
					urlPattern: /\/source\.pdf$/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'pdf-cache',
						expiration: {
							maxEntries: 1,
							maxAgeSeconds: 365 * 24 * 60 * 60,
						},
						cacheableResponse: {
							statuses: [0, 200],
						},
						rangeRequests: true,
					},
				},
			],
		},
		devOptions: {
			enabled: false,
		},
	},

	typescript: {
		strict: true,
		// Disable typeCheck in dev due to vue-tsc/TS 5.9 compatibility issue
		// Type checking still works on build
		typeCheck: false,
	},
})
