import { Answer } from "../entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"

interface AnswerQuestionRequest {
  questionId: string
  instructorId: string
  content: string
}

export class AnswerQuestion {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({ questionId, instructorId, content }: AnswerQuestionRequest) {
    const answer = new Answer({
      authorId: instructorId,
      questionId,
      content
    })
    await this.answerRepository.create(answer)
    return answer
  }
}