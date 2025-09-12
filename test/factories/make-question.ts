import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export const makeQuestion = (
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) => {
  return Question.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId('1'),
      ...override,
    },
    id,
  )
}
