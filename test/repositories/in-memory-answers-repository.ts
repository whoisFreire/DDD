import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.answers.find((item) => item.id.toString() === answerId)

    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.answers.findIndex((item) => item.id === answer.id)

    this.answers.splice(index, 1)
  }

  async save(answer: Answer): Promise<void> {
    const index = this.answers.findIndex((item) => item.id === answer.id)

    this.answers[index] = answer
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    const { page } = params

    const answers = this.answers
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
