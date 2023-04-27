import {
  CHAT_GPT_API_KEY,
  CHAT_GPT_API_URL,
  GPT_API_ENDPOINTS,
  HTTP_METHODS,
} from '../consts';
import { IModerationResponse, ITextCompletionResponse } from './types';

const request = async <TResponse>(
  endpoint: GPT_API_ENDPOINTS,
  method = HTTP_METHODS.Get,
  body: Record<string, any> | null = null
): Promise<TResponse> => {
  const response = await fetch(`${CHAT_GPT_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CHAT_GPT_API_KEY}`,
    },
    body: body && JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return response.json();
};

const getModeration = async (input: string | string[]) => {
  const response = await request<IModerationResponse>(
    GPT_API_ENDPOINTS.Moderations,
    HTTP_METHODS.Post,
    { input }
  );

  return response.results.map(({ flagged }) => +flagged);
};

const getCompletions = async (prompt: string | string[]) => {
  const response = await request<ITextCompletionResponse>(
    GPT_API_ENDPOINTS.Completions,
    HTTP_METHODS.Post,
    { model: 'text-davinci-003', prompt }
  );

  return response.choices[0].text.trim();
};

export { getModeration, getCompletions };
