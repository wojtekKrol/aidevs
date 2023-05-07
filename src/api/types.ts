interface IAuthorizeResponse extends Response {
  code: number
  message: string
  token: string
}

interface ITaskResponse extends Response {
  code: number
  msg: string
  input: string | string[]
  question?: string | undefined
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

export {
  ITextCompletionResponse,
  IAuthorizeResponse,
  ITaskResponse,
  IModerationResponse,
}
