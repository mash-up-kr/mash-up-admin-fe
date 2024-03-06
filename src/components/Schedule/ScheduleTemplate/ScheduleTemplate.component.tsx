import React, { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Button, DatePickerField, InputField, RadioButtonField, SelectField } from '@/components';
import { InputSize } from '@/components/common/Input/Input.component';
import * as Styled from './ScheduleTemplate.styled';
import { $generations } from '@/store';
import { SelectOption } from '@/components/common/Select/Select.component';
import { SessionTemplate } from '../SessionTemplate';
import Plus from '@/assets/svg/plus-20.svg';
import { EventCreateRequest } from '@/types';
import { LocationType, ScheduleFormValues } from '@/utils';
import { useScript } from '@/hooks';

const DEFAULT_SESSION: EventCreateRequest = {
  startedAt: '',
  name: '',
  endedAt: '',
  contentsCreateRequests: [],
};

const DAUM_POSTCODE_SCRIPT = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
const DAUM_POSTCODE_API_URL = 'https://dapi.kakao.com/v2/local/search/address';

const ScheduleTemplate = () => {
  const { register, control, formState, getValues, watch, setValue } =
    useFormContext<ScheduleFormValues>();
  const generations = useRecoilValue($generations);

  const locationType = watch('locationType');

  const { fields, append, remove } = useFieldArray({
    name: 'sessions',
    control,
  });

  useScript(DAUM_POSTCODE_SCRIPT);

  const generationOptions = useMemo<SelectOption[]>(() => {
    return generations.map(({ generationNumber }) => ({
      label: `${generationNumber}기`,
      value: generationNumber.toString(),
    }));
  }, [generations]);

  const defaultOption = generationOptions.find(
    (option) => option.value === getValues('generationNumber')?.toString(),
  );
  const handleClickAddressSearch = () => {
    new window.daum.Postcode({
      async oncomplete(data: { address: string }) {
        const res = await fetch(`${DAUM_POSTCODE_API_URL}?query=${data.address}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'KakaoAK cc4af66dc10aa1a20830f3cc62c40a87',
          },
        });
        const json = await res.json();

        const {
          address_name: address,
          x: longitude,
          y: latitude,
          building_name: buildingName,
        } = json.documents[0].road_address;
        const placeName = buildingName || address;

        setValue('locationInfo', {
          address,
          latitude,
          longitude,
          placeName,
        });
        setValue('placeName', placeName);
      },
    }).open();
  };

  return (
    <>
      <Styled.ScheduleContent>
        <Styled.Title>스케줄 정보</Styled.Title>
        <InputField
          $size={InputSize.md}
          label="스케줄 제목"
          placeholder="내용을 입력해주세요"
          required
          {...register('name', { required: true })}
        />
        <SelectField
          label="기수"
          size="md"
          options={generationOptions}
          defaultValue={defaultOption}
          required
          isFullWidth
          {...register('generationNumber', { required: true })}
        />
        <DatePickerField
          label="스케줄 일시"
          $size="md"
          placeholder="내용을 입력해주세요"
          required
          defaultDate={getValues('date')}
          {...register('date', { required: true })}
        />
        <div>
          <Styled.InputLabel htmlFor="location">
            <span>장소</span>
            <Styled.RequiredDot />
          </Styled.InputLabel>
          <Styled.RadioButtonGroup>
            <RadioButtonField
              label="오프라인"
              required
              value={LocationType.OFFLINE}
              {...register('locationType', { required: true })}
            />
            <RadioButtonField
              label="온라인"
              required
              value={LocationType.ONLINE}
              {...register('locationType', { required: true })}
            />
          </Styled.RadioButtonGroup>
          {locationType === LocationType.OFFLINE && (
            <Styled.InputWithButton>
              <InputField
                $size="md"
                placeholder="장소"
                {...register('placeName', { required: locationType === LocationType.OFFLINE })}
              />
              <Button shape="primaryLine" $size="md" onClick={handleClickAddressSearch}>
                주소 검색
              </Button>
            </Styled.InputWithButton>
          )}
        </div>
      </Styled.ScheduleContent>
      <Styled.SessionContent>
        <Styled.Title>세션 정보</Styled.Title>
        {fields.map((field, index) => (
          <SessionTemplate
            key={field.id}
            index={index}
            {...field}
            onRemove={remove}
            errors={formState.errors.sessions?.[index]}
          />
        ))}
        <Styled.AddButton type="button" onClick={() => append(DEFAULT_SESSION)}>
          <Plus />
          세션 추가
        </Styled.AddButton>
      </Styled.SessionContent>
    </>
  );
};

export default ScheduleTemplate;
