const { AI_DEVS_API_KEY, CHAT_GPT_API_KEY } = process.env

const AI_DEVS_API_URL = 'https://zadania.aidevs.pl'
const GPT_API_URL = 'https://api.openai.com/v1'

enum AI_DEVS_ENDPOINTS {
  Token = '/token',
  Task = '/task',
  Answer = '/answer',
}
enum AI_DEVS_TASKS_ENDPOINTS {
  Inprompt = '/inprompt',
  Moderation = '/moderation',
  HelloApi = '/helloapi',
  Blogger = '/blogger',
  Scraper = '/scraper',
}
enum GPT_API_ENDPOINTS {
  Moderations = '/moderations',
  Completions = '/completions',
  ChatCompletions = '/chat/completions',
}
enum CHAT_MODEL {
  GPT_4 = 'gpt-4',
  GPT_3_5 = 'gpt-4',
}
enum HTTP_METHODS {
  Get = 'GET',
  Post = 'POST',
}

enum ROLE {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
}

export {
  ROLE,
  CHAT_MODEL,
  AI_DEVS_API_KEY,
  CHAT_GPT_API_KEY,
  GPT_API_ENDPOINTS,
  GPT_API_URL,
  AI_DEVS_API_URL,
  AI_DEVS_TASKS_ENDPOINTS,
  AI_DEVS_ENDPOINTS,
  HTTP_METHODS,
}
