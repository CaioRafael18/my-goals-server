/** biome-ignore-all lint/suspicious/useAwait: test */
/** biome-ignore-all lint/nursery/useNumericSeparators: test */
/** biome-ignore-all lint/performance/noNamespaceImport: test */
import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '../db/connection.ts'
import { users } from '../db/schema/users.ts'
import { makeUser } from '../factories/make-user.ts'
import * as github from '../services/github.ts'
import { authenticateFromGithubCode } from './authenticate-from-github-code-use-case.ts'

const GITHUB_USER_ID = 123456789

describe('authenticate from github code', () => {
  beforeEach(async () => {
    await db.delete(users).where(eq(users.externalAccountId, GITHUB_USER_ID))

    vi.mock('../services/github.ts')
  })

  it('should be able to authenticate from github code', async () => {
    vi.spyOn(github, 'getAccessTokenFromCode').mockImplementationOnce(
      async () => {
        return 'valid-access-token'
      }
    )

    vi.spyOn(github, 'getUserFromAccessToken').mockImplementationOnce(
      async () => {
        return {
          id: GITHUB_USER_ID,
          name: 'teste',
          email: 'teste@example.com',
          avatar_url: 'https://github.com/teste.png',
        }
      }
    )

    const sut = await authenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, GITHUB_USER_ID))

    expect(userOnDb.name).toEqual('teste')
  })

  it('should be able to authenticate when user already exists', async () => {
    const user = await makeUser({
      externalAccountId: GITHUB_USER_ID,
    })

    vi.spyOn(github, 'getAccessTokenFromCode').mockImplementationOnce(
      async () => {
        return 'valid-access-token'
      }
    )

    vi.spyOn(github, 'getUserFromAccessToken').mockImplementationOnce(
      async () => {
        return {
          id: GITHUB_USER_ID,
          name: 'teste',
          email: 'teste@example.com',
          avatar_url: 'https://github.com/teste.png',
        }
      }
    )

    const sut = await authenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, GITHUB_USER_ID))

    expect(userOnDb.name).toEqual(user.name)
  })
})
