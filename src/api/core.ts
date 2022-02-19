import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { ACCESS_TOKEN, HTTP_METHODS } from '@/constants';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

const handleRequest = (config: AxiosRequestConfig) => {
  const TOKEN = localStorage.getItem(ACCESS_TOKEN);

  return TOKEN
    ? {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    : config;
};

const handleResponse = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        throw new Error(error as any);
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
  throw new Error(error as any);
};

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  // TODO:(용재) any 처리하기
  (config: AxiosRequestConfig): Promise<any> =>
    _axiosInstance({ ...handleRequest(config), method: methodType })
      .then(handleResponse)
      .catch(handleError);

export default {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHODS.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};
