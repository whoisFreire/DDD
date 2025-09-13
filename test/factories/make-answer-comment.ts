import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'

export const makeAnswerComment = (
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) => {
  return AnswerComment.create(
    {
      answerId: new UniqueEntityId('1'),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId('1'),
      ...override,
    },
    id,
  )
}
