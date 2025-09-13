import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase
describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentUseCase(inMemoryRepository)
  })

  it('should be able to delete a comment on answer', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryRepository.answerComments).toHaveLength(0)
  })

  it('should not be able to delete a comment on answer from another author', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-test'),
    })

    await inMemoryRepository.create(answerComment)

    await expect(() =>
      sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'another-author',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
