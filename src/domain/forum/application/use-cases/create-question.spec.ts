import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('Create Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      content: 'question content',
      title: 'Question title',
    })

    expect(question.content).toEqual('question content')
  })
})
