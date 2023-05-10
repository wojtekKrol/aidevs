import { getTask, sendAnswer } from '../api'
import { AI_DEVS_TASKS_ENDPOINTS, ROLE } from '../consts'
import {
  IChatCompletionRequestBody,
  IChatCompletionResponse,
} from '../api/types'
import { getAnswerGPT4, scrapDataFromUrl } from '../helpers'

const scraper = async () => {
  const { token, taskDescription } = await getTask(
    AI_DEVS_TASKS_ENDPOINTS.Scraper,
  )

  const result = await scrapDataFromUrl(taskDescription.input as string)

  const messages: IChatCompletionRequestBody['messages'] = [
    {
      role: ROLE.System,
      content: `Act as genius which will ${taskDescription.msg}`,
    },
    {
      role: ROLE.User,
      content: `${taskDescription.question}, text:\n ${result}`,
    },
  ]

  let answer = await getAnswerGPT4(messages)

  if (answer !== 'Moderation failed') {
    answer = (answer as IChatCompletionResponse).choices[0].message.content

    const answerResult = await sendAnswer(token, answer)
    console.log(answerResult)
  }
}

scraper()
