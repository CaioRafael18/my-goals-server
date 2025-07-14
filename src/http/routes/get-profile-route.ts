import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { authenticateUserHook } from '../../middleware/auth.ts'
import { getUser } from '../../use-cases/get-user-use-case.ts'

export const getProfileRoute: FastifyPluginAsyncZod = async (app) => {
  await app.get(
    '/profile',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['user'],
        operationId: 'getProfile',
        description: 'Get authenticated user profile',
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string().nullable().optional(),
              email: z.string().nullable().optional(),
              avatarUrl: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request) => {
      const userId = request.user.sub
      const { user } = await getUser({ userId })

      return { user }
    }
  )
}
