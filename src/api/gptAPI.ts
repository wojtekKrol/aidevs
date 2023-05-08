import {
  CHAT_GPT_API_KEY,
  GPT_API_URL,
  GPT_API_ENDPOINTS,
  HTTP_METHODS,
} from '../consts'
import {
  IChatCompletionResponse,
  IModerationResponse,
  ITextCompletionResponse,
  IChatCompletionRequestBody,
} from './types'

const request = async <TResponse, TBody = Record<string, any>>(
  endpoint: GPT_API_ENDPOINTS,
  method = HTTP_METHODS.Get,
  body: TBody,
): Promise<TResponse> => {
  const response = await fetch(`${GPT_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CHAT_GPT_API_KEY}`,
    },
    body: body && JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Error: ${response.status} - ${errorText}`)
  }

  return response.json()
}

const getModeration = async (input: string | string[]) => {
  const response = await request<IModerationResponse>(
    GPT_API_ENDPOINTS.Moderations,
    HTTP_METHODS.Post,
    { input },
  )

  return response.results.map(({ flagged }) => +flagged)
}

const getCompletions = async (prompt: string | string[]) => {
  return await request<ITextCompletionResponse>(
    GPT_API_ENDPOINTS.Completions,
    HTTP_METHODS.Post,
    { model: 'text-davinci-003', prompt },
  )
}

const getCompletionsGPT4 = async (body: IChatCompletionRequestBody) => {
  return await request<IChatCompletionResponse, IChatCompletionRequestBody>(
    GPT_API_ENDPOINTS.ChatCompletions,
    HTTP_METHODS.Post,
    body,
  )
}

export { getModeration, getCompletions, getCompletionsGPT4 }
