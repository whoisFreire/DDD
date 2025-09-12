import { AnswerQuestion } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Answer content',
  })

  expect(answer.content).toEqual('Answer content')
})
