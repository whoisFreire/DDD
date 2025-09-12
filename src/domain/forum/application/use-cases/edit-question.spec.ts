import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryRepository)
  })

  it('should be able to edit a question', async () => {
    const mock = makeQuestion(
      { authorId: new UniqueEntityId('author-test') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(mock)

    await sut.execute({
      questionId: mock.id.toString(),
      authorId: 'author-test',
      title: 'test title',
      content: 'test content',
    })

    expect(inMemoryRepository.questions[0]).toMatchObject({
      title: 'test title',
      content: 'test content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const mock = makeQuestion(
      { authorId: new UniqueEntityId('author-test') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(mock)

    await expect(() =>
      sut.execute({
        questionId: mock.id.toString(),
        authorId: 'another-author-test',
        title: 'test title',
        content: 'test content',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryRepository.questions).toHaveLength(1)
  })
})
