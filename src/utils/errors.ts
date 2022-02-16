import { AxiosError } from 'axios';

export const neverExpected = (value: never) => {
  throw new Error(`Unexpected value : ${value}`);
};

export const throwAPIErrorMessage = (error: AxiosError) => {
  if (!error.response) throw error;
  throw error.response.data.message;
};
