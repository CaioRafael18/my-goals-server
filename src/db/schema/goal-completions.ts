import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { goals } from './goals.ts'

export const goalCompletions = pgTable('goal_completions', {
  id: uuid().primaryKey().defaultRandom(),
  goalId: uuid()
    .references(() => goals.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})
