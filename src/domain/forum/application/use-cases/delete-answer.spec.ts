import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase
describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryRepository)
  })

  it('should be able to delete a answer', async () => {
    const mock = makeAnswer(
      { authorId: new UniqueEntityId('author-test') },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryRepository.create(mock)

    await sut.execute({ answerId: 'answer-1', authorId: 'author-test' })

    expect(inMemoryRepository.answers).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const mock = makeAnswer(
      { authorId: new UniqueEntityId('author-test') },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryRepository.create(mock)

    await expect(() =>
      sut.execute({
        answerId: 'answer-1',
        authorId: 'another-author-test',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryRepository.answers).toHaveLength(1)
  })
})
