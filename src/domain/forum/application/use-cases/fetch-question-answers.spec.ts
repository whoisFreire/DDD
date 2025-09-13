import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('1') }),
    )
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('1') }),
    )
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('1') }),
    )

    const { answers } = await sut.execute({
      page: 1,
      questionId: '1',
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('1') }),
      )
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: '1',
    })

    expect(answers).toHaveLength(2)
  })
})
