import type { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticateUserHook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (_err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
