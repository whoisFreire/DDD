import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export const makeQuestion = (override: Partial<QuestionProps> = {}) => {
  return Question.create({
    title: 'example question',
    content: 'question content',
    authorId: new UniqueEntityId('1'),
    ...override,
  })
}
