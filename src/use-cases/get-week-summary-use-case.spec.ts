import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { makeGoal } from '../factories/make-goal.ts'
import { makeGoalCompletion } from '../factories/make-goal-completion.ts'
import { makeUser } from '../factories/make-user.ts'
import { getWeekSummary } from './get-week-summary-use-case.ts'

describe('get week summary', () => {
  it('should be able to get week summary', async () => {
    const user = await makeUser()

    const weekStartsAt = dayjs(new Date(2024, 9, 6))
      .startOf('week')
      .toDate()

    const goal1 = await makeGoal({
      userId: user.id,
      title: 'Meditar',
      desiredWeeklyFrequency: 2,
      createdAt: weekStartsAt,
    })

    const goal2 = await makeGoal({
      userId: user.id,
      title: 'Nadar',
      desiredWeeklyFrequency: 1,
      createdAt: weekStartsAt,
    })

    const goal3 = await makeGoal({
      userId: user.id,
      title: 'Ler',
      desiredWeeklyFrequency: 3,
      createdAt: weekStartsAt,
    })

    await makeGoalCompletion({
      goalId: goal1.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })

    await makeGoalCompletion({
      goalId: goal2.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })

    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(3, 'days').toDate(),
    })

    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(5, 'days').toDate(),
    })

    const result = await getWeekSummary({
      userId: user.id,
      weekStartsAt,
    })

    expect(result).toEqual({
      summary: {
        completed: 4,
        total: 6,
        goalsPerDay: {
          '2024-10-11': expect.arrayContaining([
            expect.objectContaining({ title: 'Ler' }),
          ]),
          '2024-10-09': expect.arrayContaining([
            expect.objectContaining({ title: 'Ler' }),
          ]),
          '2024-10-08': expect.arrayContaining([
            expect.objectContaining({ title: 'Meditar' }),
            expect.objectContaining({ title: 'Nadar' }),
          ]),
        },
      },
    })
  })
})
