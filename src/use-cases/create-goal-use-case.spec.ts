import { describe, expect, it } from 'vitest'
import { makeUser } from '../factories/make-user.ts'
import { createGoal } from './create-goal-use-case.ts'

describe('create goal', () => {
  it('should be able to create a new goal', async () => {
    const user = await makeUser()

    const result = await createGoal({
      userId: user.id,
      title: 'Example goal',
      desiredWeeklyFrequency: 5,
    })

    expect(result).toEqual({
      goal: expect.objectContaining({
        id: expect.any(String),
        title: 'Example goal',
        desiredWeeklyFrequency: 5,
      }),
    })
  })
})
