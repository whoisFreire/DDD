import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

export const makeAnswer = (
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) => {
  return Answer.create(
    {
      content: faker.lorem.text(),
      questionId: new UniqueEntityId('1'),
      authorId: new UniqueEntityId('1'),
      ...override,
    },
    id,
  )
}
