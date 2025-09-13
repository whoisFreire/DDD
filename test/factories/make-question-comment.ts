import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment'

export const makeQuestionComment = (
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) => {
  return QuestionComment.create(
    {
      questionId: new UniqueEntityId('1'),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId('1'),
      ...override,
    },
    id,
  )
}
