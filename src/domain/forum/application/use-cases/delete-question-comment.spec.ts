import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase
describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryRepository)
  })

  it('should be able to delete a comment on question', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryRepository.questionComments).toHaveLength(0)
  })

  it('should not be able to delete a comment on question from another author', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-test'),
    })

    await inMemoryRepository.create(questionComment)

    await expect(() =>
      sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'another-author',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
