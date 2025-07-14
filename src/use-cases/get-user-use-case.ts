import { eq } from 'drizzle-orm'
import { db } from '../db/connection.ts'
import { users } from '../db/schema/users.ts'

interface GetUserRequest {
  userId: string
}

export async function getUser({ userId }: GetUserRequest) {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      externalAccountId: users.externalAccountId,
      avatarUrl: users.avatarUrl,
    })
    .from(users)
    .where(eq(users.id, userId))

  return { user }
}
