import { ApplicationByIdRequest, ApplicationByIdResponseData } from '@/types/dto';
import { selectorFamilyWithRefresher } from './recoil';
import { getApplicationById } from '@/api/applicationById';

export const $applicationById = selectorFamilyWithRefresher<
  ApplicationByIdResponseData,
  ApplicationByIdRequest
>({
  key: 'applicationById',
  get: (params) => async () => {
    const { data } = await getApplicationById(params);

    return data;
  },
});
