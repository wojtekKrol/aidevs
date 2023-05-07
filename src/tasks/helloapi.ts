import { getTask, sendAnswer } from '../api'
import { AI_DEVS_TASKS_ENDPOINTS } from '../consts'
import { ITaskResponse } from '../api/types'

interface IHelloApiResponse extends ITaskResponse {
  cookie: string
}

;(async () => {
  const { token, taskDescription } = await getTask(
    AI_DEVS_TASKS_ENDPOINTS.HelloApi,
  )
  const answer = taskDescription as IHelloApiResponse
  const response = await sendAnswer(token, answer.cookie)

  console.log(response)
})()
