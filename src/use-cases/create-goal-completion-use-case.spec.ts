import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '../db/connection.ts'
import { users } from '../db/schema/users.ts'
import { makeGoal } from '../factories/make-goal.ts'
import { makeGoalCompletion } from '../factories/make-goal-completion.ts'
import { makeUser } from '../factories/make-user.ts'
import { createGoalCompletion } from './create-goal-completion-use-case.ts'

describe('create goal completion', () => {
  it('should be able to complete a goal', async () => {
    const user = await makeUser()
    const goal = await makeGoal({ userId: user.id })

    const result = await createGoalCompletion({
      goalId: goal.id,
      userId: user.id,
    })

    expect(result).toEqual({
      goalCompletion: expect.objectContaining({
        id: expect.any(String),
        goalId: goal.id,
      }),
    })
  })

  it('should not be able to complete a goal more times then it expects', async () => {
    const user = await makeUser()

    const goal = await makeGoal({
      userId: user.id,
      desiredWeeklyFrequency: 1,
    })

    await makeGoalCompletion({ goalId: goal.id })

    await expect(
      createGoalCompletion({
        goalId: goal.id,
        userId: user.id,
      })
    ).rejects.toThrow()
  })

  it('should increase user experience by 5 when completing a goal', async () => {
    const user = await makeUser({ experience: 0 })

    const goal = await makeGoal({
      userId: user.id,
      desiredWeeklyFrequency: 5,
    })

    await createGoalCompletion({
      goalId: goal.id,
      userId: user.id,
    })

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))

    expect(userOnDb.experience).toEqual(5)
  })

  it('should increase user experience by 7 when fully completing a goal', async () => {
    const user = await makeUser({ experience: 0 })

    const goal = await makeGoal({
      userId: user.id,
      desiredWeeklyFrequency: 1,
    })

    await createGoalCompletion({
      goalId: goal.id,
      userId: user.id,
    })

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))

    expect(userOnDb.experience).toEqual(7)
  })
})
