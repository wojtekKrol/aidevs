interface IAuthorizeResponse extends Response {
  code: number
  message: string
  token: string
}

interface ITaskDescriptionResponse extends Response {
  code: number
  msg: string
  input: string | string[]
  question?: string | undefined
  blog?: string | undefined
}
interface ITaskResponse extends Response {
  code: number
  msg: string
  note: string
}

interface IModerationCategories {
  hate: boolean
  'hate/threatening': boolean
  'self-harm': boolean
  sexual: boolean
  'sexual/minors': boolean
  violence: boolean
  'violence/graphic': boolean
}

interface ICategoryScores {
  hate: number
  'hate/threatening': number
  'self-harm': number
  sexual: number
  'sexual/minors': number
  violence: number
  'violence/graphic': number
}

interface IModerationResult {
  categories: IModerationCategories
  category_scores: ICategoryScores
  flagged: boolean
}

interface IModerationResponse extends Response {
  id: string
  model: string
  results: IModerationResult[]
}

interface ITextCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    text: string
    index: number
    logprobs: any
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

type Role = 'system' | 'user' | 'assistant'

interface Message {
  role: Role
  content: string
  name?: string
}

type Messages = Message[]

interface RequestOptions {
  model: string
  messages: Messages
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  stop?: string | string[]
  max_tokens?: number
  presence_penalty?: number
  frequency_penalty?: number
  logit_bias?: Record<string, number>
  user?: string
}

type IChatCompletionRequestBody = RequestOptions

interface IChatCompletionResponse {
  id: string
  object: string
  created: number
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export {
  IChatCompletionResponse,
  IChatCompletionRequestBody,
  ITextCompletionResponse,
  IAuthorizeResponse,
  ITaskDescriptionResponse,
  ITaskResponse,
  IModerationResponse,
}
