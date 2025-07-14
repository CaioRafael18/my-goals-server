import dayjs from 'dayjs'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { authenticateUserHook } from '../../middleware/auth.ts'
import { getWeekSummary } from '../../use-cases/get-week-summary-use-case.ts'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  await app.get(
    '/summary',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        operationId: 'getWeekSummary',
        description: 'Get completed goals in a specific week',
        querystring: z.object({
          weekStartsAt: z.coerce
            .date()
            .optional()
            .default(dayjs().startOf('week').toDate()),
        }),
        response: {
          200: z.object({
            summary: z.object({
              completed: z.number(),
              total: z.number(),
              goalsPerDay: z.record(
                z.string(),
                z.array(
                  z.object({
                    id: z.string(),
                    title: z.string(),
                    completedAt: z.string(),
                  })
                )
              ),
            }),
          }),
        },
      },
    },
    async (request) => {
      const userId = request.user.sub
      const { weekStartsAt } = request.query

      const { summary } = await getWeekSummary({
        weekStartsAt,
        userId,
      })

      return { summary }
    }
  )
}
