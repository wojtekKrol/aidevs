import { getCompletionsGPT4, getModeration, getTask, sendAnswer } from '../api'
import { AI_DEVS_TASKS_ENDPOINTS, ROLE, CHAT_MODEL } from '../consts'

import { IChatCompletionRequestBody } from '../api/types'
;(async () => {
  const { token, taskDescription } = await getTask(
    AI_DEVS_TASKS_ENDPOINTS.Blogger,
  )

  const messages: IChatCompletionRequestBody['messages'] = [
    {
      role: ROLE.System,
      content:
        'Act as a highly skilled and detailed copywriter who creates persuasive content. ' +
        'Respond only in Polish. Provide answers in the format shown in the example below. ' +
        'Each element in the array should be a string with at least three sentences.\n' +
        'Example:\n' +
        '###user input\n' +
        'please provide information on topic X, chapters: Title 1, Title 2, Title N\n' +
        '###output\n' +
        '["Respond to Title 1 without repeating the title. Sentence two. Sentence three.",\n' +
        '"Respond to Title 2 without repeating the title. Sentence two. Sentence three.",\n' +
        '...,\n' +
        '"Respond to Title N-1 without repeating the title. Sentence two. Sentence three."\n' +
        '"Respond to Title N without repeating the title. Sentence two. Sentence three."].',
    },
    {
      role: ROLE.User,
      content: `${taskDescription.msg}, chapters: ${taskDescription.blog}`,
    },
  ]

  const dataForModerationCheck = messages.reduce((arr, { content }) => {
    arr.push(content)
    return arr
  }, [] as string[])

  const moderationResult = await getModeration(dataForModerationCheck)

  if (!moderationResult.includes(1)) {
    const model = CHAT_MODEL.GPT_4

    const body: IChatCompletionRequestBody = {
      model,
      messages,
    }

    try {
      const response = await getCompletionsGPT4(body)
      const result = JSON.parse(response.choices[0].message.content)

      const answerResult = await sendAnswer(token, result)
      console.log(answerResult)
    } catch (e) {
      console.log('Error: ', e)
    }
  }
})()
