import { db } from '../db/connection.ts'
import { goals } from '../db/schema/goals.ts'

interface CreateGoalRequest {
  userId: string
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  userId,
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({ userId, title, desiredWeeklyFrequency })
    .returning()

  const goal = result[0]

  return { goal }
}
