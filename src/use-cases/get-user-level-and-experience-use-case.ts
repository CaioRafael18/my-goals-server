import { eq } from 'drizzle-orm'
import { db } from '../db/connection.ts'
import { users } from '../db/schema/users.ts'
import {
  calculateExperienceToLevel,
  calculateLevelFromExperience,
} from '../services/gamification.ts'

interface GetUserLevelAndExperienceRequest {
  userId: string
}

export async function getUserLevelAndExperience({
  userId,
}: GetUserLevelAndExperienceRequest) {
  const [{ experience }] = await db
    .select({
      experience: users.experience,
    })
    .from(users)
    .where(eq(users.id, userId))

  const level = calculateLevelFromExperience(experience)

  return {
    experience,
    level,
    experienceToNextLevel: calculateExperienceToLevel(level),
  }
}
