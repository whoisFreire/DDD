import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface AnswerQuestionRequest {
  questionId: string
  instructorId: string
  content: string
}

export class AnswerQuestion {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({ questionId, instructorId, content }: AnswerQuestionRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })
    await this.answerRepository.create(answer)
    return answer
  }
}
