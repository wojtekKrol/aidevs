import {
  AI_DEVS_API_KEY,
  AI_DEVS_API_URL,
  AI_DEVS_ENDPOINTS,
  HTTP_METHODS,
} from '../consts';
import { IAuthorizeResponse, ITaskResponse } from './types';

const fetchData = async <TResponse>(
  endpoint: string,
  method = HTTP_METHODS.Get,
  body: Record<string, any> | null = null
): Promise<TResponse> => {
  const response = await fetch(`${AI_DEVS_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return response.json();
};

const authorize = (taskName: string) =>
  fetchData<IAuthorizeResponse>(
    `${AI_DEVS_ENDPOINTS.Token}/${taskName}`,
    HTTP_METHODS.Post,
    { apikey: AI_DEVS_API_KEY }
  );

const getTask = async (taskName: string) => {
  const { token } = await authorize(taskName);
  const taskDescription = await fetchData<ITaskResponse>(
    `${AI_DEVS_ENDPOINTS.Task}/${token}`
  );

  return { taskDescription, token };
};

const sendAnswer = (token: string, answer: string | string[] | number[]) =>
  fetchData(`${AI_DEVS_ENDPOINTS.Answer}/${token}`, HTTP_METHODS.Post, {
    answer,
  });

export { getTask, sendAnswer };
