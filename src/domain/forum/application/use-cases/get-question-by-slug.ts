import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugRequest {
  slug: string
}

interface GetQuestionBySlugResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return {
      question,
    }
  }
}
