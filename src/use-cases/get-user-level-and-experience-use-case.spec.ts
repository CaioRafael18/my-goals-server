import { describe, expect, it } from 'vitest'
import { makeUser } from '../factories/make-user.ts'
import { getUserLevelAndExperience } from './get-user-level-and-experience-use-case.ts'

describe('user user level and experience', () => {
  it('should be able to get the user level and experience', async () => {
    const user = await makeUser({
      experience: 200,
    })

    const result = await getUserLevelAndExperience({
      userId: user.id,
    })

    expect(result).toEqual({
      experience: 200,
      level: 6,
      experienceToNextLevel: 255,
    })
  })
})
