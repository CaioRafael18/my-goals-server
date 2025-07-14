import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users.ts'

export const goals = pgTable('goals', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => users.id),
  title: text().notNull(),
  desiredWeeklyFrequency: integer().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})
