import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { ACCESS_TOKEN, HTTP_METHODS } from '@/constants';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

const TOKEN = localStorage.getItem(ACCESS_TOKEN);

if (TOKEN) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;
}

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  // TODO:(용재) any 처리하기
  (config: AxiosRequestConfig): Promise<any> => {
    _axiosInstance.interceptors.response.use((response) => {
      if (!response.data) {
        return response;
      }

      return response.data;
    });

    return _axiosInstance({
      ...config,
      method: methodType,
    });
  };

export default {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHODS.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};
