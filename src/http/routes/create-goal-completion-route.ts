import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { authenticateUserHook } from '../../middleware/auth.ts'
import { createGoalCompletion } from '../../use-cases/create-goal-completion-use-case.ts'

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (app) => {
  await app.post(
    '/completions',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['completions'],
        operationId: 'createCompletion',
        description: 'Complete a goal',
        body: z.object({
          goalId: z.string(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub
      const { goalId } = request.body

      await createGoalCompletion({
        userId,
        goalId,
      })

      return reply.status(201).send()
    }
  )
}
