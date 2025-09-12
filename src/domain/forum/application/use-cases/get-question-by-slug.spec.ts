import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryRepository)
  })

  it('should be able to get a question by slug', async () => {
    const mock = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryRepository.create(mock)

    const { question } = await sut.execute({ slug: 'example-question' })

    expect(question.title).toEqual(mock.title)
  })
})
