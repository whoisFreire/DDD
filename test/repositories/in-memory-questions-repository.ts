import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }
}
