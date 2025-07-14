import { SignJWT } from 'jose'
import { env } from '../env.ts'

export async function authenticateUser({ userId }: { userId: string }) {
  const secret = new TextEncoder().encode(env.JWT_SECRET)

  const token = await new SignJWT()
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setSubject(userId)
    .setExpirationTime('1d')
    .sign(secret)

  return { token }
}
