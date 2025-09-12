import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
}

test('create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestionUseCase.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Answer content',
  })

  expect(answer.content).toEqual('Answer content')
})
