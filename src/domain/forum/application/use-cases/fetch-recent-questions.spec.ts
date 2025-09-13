import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 10) }),
    )
    await inMemoryRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 30) }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions[0].createdAt).toEqual(new Date(2022, 0, 30))
    expect(questions[1].createdAt).toEqual(new Date(2022, 0, 20))
    expect(questions[2].createdAt).toEqual(new Date(2022, 0, 10))
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
