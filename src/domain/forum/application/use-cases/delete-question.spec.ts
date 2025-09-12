import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryRepository)
  })

  it('should be able to delete a question', async () => {
    const mock = makeQuestion(
      { authorId: new UniqueEntityId('author-test') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(mock)

    await sut.execute({ questionId: 'question-1', authorId: 'author-test' })

    expect(inMemoryRepository.questions).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const mock = makeQuestion(
      { authorId: new UniqueEntityId('author-test') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(mock)

    await expect(() =>
      sut.execute({
        questionId: 'question-1',
        authorId: 'another-author-test',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryRepository.questions).toHaveLength(1)
  })
})
