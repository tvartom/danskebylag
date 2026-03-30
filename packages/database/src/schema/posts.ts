import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './users.js'

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	content: text('content').notNull(),
	authorId: integer('authorId')
		.notNull()
		.references(() => users.id),
	published: integer('published', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('createdAt', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updatedAt', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
})

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
