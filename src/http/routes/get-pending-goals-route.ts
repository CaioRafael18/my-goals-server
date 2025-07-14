import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { authenticateUserHook } from '../../middleware/auth.ts'
import { getWeekPendingGoals } from '../../use-cases/get-week-pending-goals-use-case.ts'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  await app.get(
    '/pending-goals',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        operationId: 'getPendingGoals',
        description: 'Get pending goals',
        response: {
          200: z.object({
            pendingGoals: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                desiredWeeklyFrequency: z.number(),
                completionCount: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const userId = request.user.sub
      const { pendingGoals } = await getWeekPendingGoals({ userId })

      return { pendingGoals }
    }
  )
}
