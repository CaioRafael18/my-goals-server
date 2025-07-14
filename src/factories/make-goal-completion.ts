import type { InferInsertModel } from 'drizzle-orm'
import { db } from '../db/connection.ts'
import { goalCompletions } from '../db/schema/goal-completions.ts'

export async function makeGoalCompletion(
  overrides: Partial<InferInsertModel<typeof goalCompletions>> &
    Pick<InferInsertModel<typeof goalCompletions>, 'goalId'>
) {
  const [result] = await db
    .insert(goalCompletions)
    .values(overrides)
    .returning()

  return result
}
