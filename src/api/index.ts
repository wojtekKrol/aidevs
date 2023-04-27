import dotenv from 'dotenv';

dotenv.config();

export { getTask, sendAnswer } from './aidevsAPI';
export { getModeration, getCompletions } from './gptAPI';
