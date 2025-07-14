import { describe, expect, it } from 'vitest'
import { makeUser } from '../factories/make-user.ts'
import { getUser } from './get-user-use-case.ts'

describe('Get User', () => {
  it('should be able to get a user', async () => {
    const user = await makeUser()

    const result = await getUser({
      userId: user.id,
    })

    expect(result).toEqual({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        externalAccountId: user.externalAccountId,
      },
    })
  })
})
