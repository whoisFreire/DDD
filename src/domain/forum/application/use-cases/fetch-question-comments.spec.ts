import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('1') }),
    )
    await inMemoryRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('1') }),
    )
    await inMemoryRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('1') }),
    )

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: '1',
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('1') }),
      )
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: '1',
    })

    expect(questionComments).toHaveLength(2)
  })
})
