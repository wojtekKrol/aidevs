import { getCompletions, getTask, sendAnswer } from '../api'
import { AI_DEVS_TASKS_ENDPOINTS } from '../consts'
;(async () => {
  const { token, taskDescription } = await getTask(
    AI_DEVS_TASKS_ENDPOINTS.Inprompt,
  )
  const question = taskDescription.question
  const name = await getCompletions(
    `Znajdź imię w pytaniu, a następnie w odpowiedzi zwróć jedynie je: ${question}`,
  )

  if (name.endsWith('.')) {
    name.slice(0, -1)
  }

  const regex = new RegExp(`\\b${name}\\b`)

  const nameCorrelatedQuestions = (taskDescription.input as string[]).filter(
    row => regex.test(row),
  )

  const answer = await getCompletions(`
    Odpowiedz na pytanie na podstawie kontekstu: ${question}
    ### kontekst
    ${nameCorrelatedQuestions[0]}
    ### /kontekst
  `)

  const response = await sendAnswer(token, answer)

  console.log(response)
})()
