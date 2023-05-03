import { BaseResponse, StorageRequest, StorageResponse } from '@/types';
import http from '@/api/core';

export const getStorage = async (key: string): Promise<BaseResponse<StorageResponse>> => {
  return http.get({ url: `/storage/key/${key}` });
};

export const postStorage = async (data: StorageRequest): Promise<BaseResponse<StorageResponse>> => {
  return http.post({
    url: '/storage',
    data,
  });
};
