import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('1') }),
    )
    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('1') }),
    )
    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('1') }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: '1',
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('1') }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: '1',
    })

    expect(answerComments).toHaveLength(2)
  })
})
