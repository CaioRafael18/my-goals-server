import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { authenticateUserHook } from '../../middleware/auth.ts'
import { getUserLevelAndExperience } from '../../use-cases/get-user-level-and-experience-use-case.ts'

export const getGamificationStatusRoute: FastifyPluginAsyncZod = async (
  app
) => {
  await app.get(
    '/gamification/status',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['user'],
        operationId: 'getGamificationStatus',
        description: 'Get authenticated user gamification status',
        response: {
          200: z.object({
            experience: z.number(),
            level: z.number(),
            experienceToNextLevel: z.number(),
          }),
        },
      },
    },
    async (request) => {
      const userId = request.user.sub

      const { experience, level, experienceToNextLevel } =
        await getUserLevelAndExperience({ userId })

      return { experience, level, experienceToNextLevel }
    }
  )
}
