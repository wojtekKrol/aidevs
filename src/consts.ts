const { AI_DEVS_API_KEY, CHAT_GPT_API_KEY } = process.env;

const AI_DEVS_API_URL = 'https://zadania.aidevs.pl';
const CHAT_GPT_API_URL = 'https://api.openai.com/v1';

enum AI_DEVS_ENDPOINTS {
  Token = '/token',
  Task = '/task',
  Answer = '/answer',
}
enum AI_DEVS_TASKS_ENDPOINTS {
  Inprompt = '/inprompt',
  Moderation = '/moderation',
  HelloApi = '/helloapi',
}
enum GPT_API_ENDPOINTS {
  Moderations = '/moderations',
  Completions = '/completions',
}

enum HTTP_METHODS {
  Get = 'GET',
  Post = 'POST',
}

export {
  AI_DEVS_API_KEY,
  CHAT_GPT_API_KEY,
  GPT_API_ENDPOINTS,
  CHAT_GPT_API_URL,
  AI_DEVS_API_URL,
  AI_DEVS_TASKS_ENDPOINTS,
  AI_DEVS_ENDPOINTS,
  HTTP_METHODS,
};
