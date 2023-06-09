import { getTask, sendAnswer } from '../api'
import { AI_DEVS_TASKS_ENDPOINTS, ROLE } from '../consts'
import { IChatCompletionRequestBody } from '../api/types'
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

  const response = await getAnswerGPT4(messages)

  const answer = response.choices[0].message.content

  const answerResult = await sendAnswer(token, answer)
  console.log(answerResult)
}

scraper()
