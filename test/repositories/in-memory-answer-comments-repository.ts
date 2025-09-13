import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.answerComments.push(answerComment)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.answerComments.find(
      (item) => item.id.toString() === id,
    )

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const answerCommentIndex = this.answerComments.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.answerComments.splice(answerCommentIndex, 1)
  }

  async findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    const { page } = params

    const questionComment = this.answerComments
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return questionComment
  }
}
