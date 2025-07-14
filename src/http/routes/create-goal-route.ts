import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { authenticateUserHook } from '../../middleware/auth.ts'
import { createGoal } from '../../use-cases/create-goal-use-case.ts'

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  await app.post(
    '/goals',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        operationId: 'createGoal',
        description: 'Create a goal',
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub
      const { title, desiredWeeklyFrequency } = request.body

      await createGoal({
        userId,
        title,
        desiredWeeklyFrequency,
      })

      return reply.status(201).send()
    }
  )
}
