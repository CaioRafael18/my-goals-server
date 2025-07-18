/** biome-ignore-all lint/nursery/useNumericSeparators: <id teste> */
import { fakerPT_BR as faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { db, sql } from './connection.ts'
import { goalCompletions } from './schema/goal-completions.ts'
import { goals } from './schema/goals.ts'
import { users } from './schema/users.ts'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const [user] = await db
    .insert(users)
    .values({
      name: 'teste',
      externalAccountId: 123456,
      avatarUrl: 'https://github.com/teste',
    })
    .returning()

  const [goal1, goal2] = await db
    .insert(goals)
    .values([
      {
        userId: user.id,
        title: faker.lorem.words(3),
        desiredWeeklyFrequency: 1,
      },
      {
        userId: user.id,
        title: faker.lorem.words(3),
        desiredWeeklyFrequency: 2,
      },
      {
        userId: user.id,
        title: faker.lorem.words(3),
        desiredWeeklyFrequency: 1,
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: goal1.id, createdAt: startOfWeek.toDate() },
    { goalId: goal2.id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().then(() => {
  // biome-ignore lint/suspicious/noConsole: only use dev
  console.log('🌱 Database seeded successfully!')
  sql.end()
})
