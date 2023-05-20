import { getTask, sendAnswer } from '../api'
import { AI_DEVS_TASKS_ENDPOINTS, ROLE } from '../consts'
import {
  IChatCompletionRequestBody,
  IChatCompletionResponse,
} from '../api/types'
import { getAnswerGPT4 } from '../helpers'
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

  const response = await getAnswerGPT4(messages)

  const answer = response.choices[0].message.content

  const answerResult = await sendAnswer(token, answer)
  console.log(answerResult)
})()
