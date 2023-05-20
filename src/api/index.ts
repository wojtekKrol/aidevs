import * as dotenv from 'dotenv'

dotenv.config()

export { getTask, sendAnswer } from './aidevsAPI'
export { getModeration, getCompletions, getCompletionsGPT4 } from './gptAPI'
