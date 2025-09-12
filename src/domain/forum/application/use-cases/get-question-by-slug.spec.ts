import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryRepository)
  })

  it('should be able to get a question by slug', async () => {
    const questionObj = Question.create({
      title: 'example question',
      content: 'question content',
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryRepository.create(questionObj)

    const { question } = await sut.execute({ slug: 'example-question' })

    expect(question.content).toEqual('question content')
  })
})
