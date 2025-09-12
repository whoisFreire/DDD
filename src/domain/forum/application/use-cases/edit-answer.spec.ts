import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase
describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryRepository)
  })

  it('should be able to edit a answer', async () => {
    const mock = makeAnswer(
      { authorId: new UniqueEntityId('author-test') },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryRepository.create(mock)

    await sut.execute({
      answerId: mock.id.toString(),
      authorId: 'author-test',
      content: 'test content',
    })

    expect(inMemoryRepository.answers[0]).toMatchObject({
      content: 'test content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const mock = makeAnswer(
      { authorId: new UniqueEntityId('author-test') },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryRepository.create(mock)

    await expect(() =>
      sut.execute({
        answerId: mock.id.toString(),
        authorId: 'another-author-test',
        content: 'test content',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryRepository.answers).toHaveLength(1)
  })
})
