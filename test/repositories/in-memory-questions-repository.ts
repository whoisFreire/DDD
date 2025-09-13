import { PaginationParams } from '@/core/repositories/pagination-params'
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

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (item) => item.id === question.id,
    )

    this.questions.splice(questionIndex, 1)
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (item) => item.id === question.id,
    )

    this.questions[questionIndex] = question
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    return this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }
}
