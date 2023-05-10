import { getCompletionsGPT4, getModeration } from './api'
import { CHAT_MODEL } from './consts'
import { IChatCompletionRequestBody } from './api/types'

const getAnswer = (model: CHAT_MODEL = CHAT_MODEL.GPT_4) => {
  return async (messages: IChatCompletionRequestBody['messages']) => {
    const dataForModerationCheck = messages.reduce((arr, { content }) => {
      arr.push(content)
      return arr
    }, [] as string[])

    const moderationResult = await getModeration(dataForModerationCheck)

    if (!moderationResult.includes(1)) {
      const body: IChatCompletionRequestBody = {
        model,
        messages,
      }

      try {
        return await getCompletionsGPT4(body)
      } catch (e) {
        console.log('Error: ', e)
      }
    }
    return 'Moderation failed'
  }
}

const scrapDataFromUrl = async (url: string, initTimeout = 0) => {
  let timeout = initTimeout

  while (true) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP-Response not OK: ${response.status}`)
      }

      return await response.text()
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Attempt failed: ${error.message}`)
      } else {
        console.error(`An unknown error occurred: ${error}`)
      }
      console.log(`Retrying in ${timeout / 1000} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, timeout))
      timeout += 10000
    }
  }
}

const getAnswerGPT3_5 = getAnswer(CHAT_MODEL.GPT_3_5)
const getAnswerGPT4 = getAnswer()

export { scrapDataFromUrl, getAnswerGPT3_5, getAnswerGPT4 }
