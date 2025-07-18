import { expect, test } from 'vitest'
import {
  calculateExperienceToLevel,
  calculateLevelFromExperience,
} from './gamification.ts'

test('experience to level', () => {
  const experienceToLevel1 = calculateExperienceToLevel(1)
  const experienceToLevel2 = calculateExperienceToLevel(2)
  const experienceToLevel5 = calculateExperienceToLevel(4)

  expect(experienceToLevel1).toEqual(20)
  expect(experienceToLevel2).toEqual(46)
  expect(experienceToLevel5).toEqual(123)
})

test('level from experience', () => {
  const level1 = calculateLevelFromExperience(10)
  const level2 = calculateLevelFromExperience(26)
  const level5 = calculateLevelFromExperience(43 + 33 + 26)

  expect(level1).toEqual(1)
  expect(level2).toEqual(2)
  expect(level5).toEqual(4)
})
