/** biome-ignore-all lint/suspicious/noConsole: development */
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import fastifyCors from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { authenticateFromGithubRoute } from './http/routes/authenticate-from-github-route.ts'
import { createGoalCompletionRoute } from './http/routes/create-goal-completion-route.ts'
import { createGoalRoute } from './http/routes/create-goal-route.ts'
import { getPendingGoalsRoute } from './http/routes/get-pending-goals-route.ts'
import { getProfileRoute } from './http/routes/get-profile-route.ts'
import { getUserExperienceAndLevelRoute } from './http/routes/get-user-experience-and-level.ts'
import { getWeekSummaryRoute } from './http/routes/get-week-summary-route.ts'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'MyGoals',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(authenticateFromGithubRoute)
app.register(createGoalCompletionRoute)
app.register(createGoalRoute)
app.register(getUserExperienceAndLevelRoute)
app.register(getPendingGoalsRoute)
app.register(getProfileRoute)
app.register(getWeekSummaryRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('🚀 Server is running on port 3333')
})

if (env.NODE_ENV === 'development') {
  console.log(import.meta.dirname)
  const specFile = resolve(import.meta.dirname, '../swagger.json')

  app.ready().then(() => {
    const spec = JSON.stringify(app.swagger(), null, 2)

    writeFile(specFile, spec).then(() => {
      console.log('swagger.json spec generated')
    })
  })
}
