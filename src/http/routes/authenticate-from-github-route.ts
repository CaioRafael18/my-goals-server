import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { authenticateFromGithubCode } from '../../use-cases/authenticate-from-github-code-use-case.ts'

export const authenticateFromGithubRoute: FastifyPluginAsyncZod = async (
  app
) => {
  await app.post(
    '/auth/github',
    {
      schema: {
        tags: ['auth'],
        operationId: 'authenticateFromGithub',
        description: 'Authenticate from GitHub code',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({ token: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const { token } = await authenticateFromGithubCode({
        code,
      })

      return reply.status(201).send({ token })
    }
  )
}
