import { getModeration, getTask, sendAnswer } from '../api'
import { AI_DEVS_TASKS_ENDPOINTS } from '../consts'
;(async () => {
  const { token, taskDescription } = await getTask(
    AI_DEVS_TASKS_ENDPOINTS.Moderation,
  )
  const answer = await getModeration(taskDescription.input)

  const response = await sendAnswer(token, answer)

  console.log(response)
})()
