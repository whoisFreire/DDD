import { makeAnswer } from 'test/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase
describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    )
  })

  it('should be able to choose question best answer', async () => {
    const questionMock = makeQuestion()
    const AnswerMock = makeAnswer({ questionId: questionMock.id })

    await inMemoryQuestionRepository.create(questionMock)
    await inMemoryAnswerRepository.create(AnswerMock)

    await sut.execute({
      answerId: AnswerMock.id.toString(),
      authorId: questionMock.authorId.toString(),
    })

    expect(inMemoryQuestionRepository.questions[0].bestAnswerId).toEqual(
      AnswerMock.id,
    )
  })

  it('should not be able to choose another user question best answer', async () => {
    const questionMock = makeQuestion()
    const AnswerMock = makeAnswer({ questionId: questionMock.id })

    await inMemoryQuestionRepository.create(questionMock)
    await inMemoryAnswerRepository.create(AnswerMock)

    await expect(() =>
      sut.execute({
        answerId: AnswerMock.id.toString(),
        authorId: 'another-author',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
