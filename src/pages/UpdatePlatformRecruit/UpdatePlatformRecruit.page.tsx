import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { OutputData } from '@editorjs/editorjs';
import { Editor, EditorAside } from '@/components';
import * as Styled from './UpdatePlatformRecruit.styled';
import { $teams, $profile } from '@/store';
import { SelectSize } from '@/components/common/Select/Select.component';
import { decodeHTMLEntities, getDefaultEditorData, removeWrongAmpString, request } from '@/utils';
import { useToast } from '@/hooks';
import { ToastType } from '@/components/common/Toast/Toast.component';
import * as api from '@/api';

const EDITOR_ID = 'platform-recruit-editor';
const STAFF_PROFILES = ['BRANDING', 'MASHUP'];

const UpdatePlatformRecruit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [savedEditorData, setSavedEditorData] = useState<OutputData>(getDefaultEditorData());
  const [selectedPlatform, setSelectedPlatform] = useState('design');
  const storageKey = `recruit-${selectedPlatform}`;

  const { handleAddToast } = useToast();
  const teams = useRecoilValue($teams);
  const teamOptions = teams.map(({ teamId, name }) => ({
    value: teamId.toString(),
    label: name,
  }));

  const myTeamName = useRecoilValue($profile)[0];
  const getTeamSelectOptions = () => {
    if (STAFF_PROFILES.includes(myTeamName)) return teamOptions;
    const myTeamOptionObject = teamOptions.find(({ label }) => label.toUpperCase() === myTeamName);
    return [myTeamOptionObject ?? { label: '', value: '' }];
  };
  const teamSelectOptions = getTeamSelectOptions();

  const handleUpdateButtonClick = async () => {
    const originalOutputData = JSON.parse(localStorage.getItem(EDITOR_ID) ?? '{}');
    const storageValue = { editorData: originalOutputData };

    request({
      requestFunc: () => {
        setIsLoading(true);
        return api.postStorage({ keyString: storageKey, valueMap: storageValue });
      },
      errorHandler: () => {
        handleAddToast({
          type: ToastType.error,
          message: '모집공고를 저장하지 못했습니다. 다시 시도해주세요.',
        });
      },
      onSuccess: () => {
        handleAddToast({
          type: ToastType.success,
          message: '성공적으로 모집공고를 저장했습니다.',
        });
      },
      onCompleted: () => {
        setIsLoading(false);
      },
    });
  };

  const getPlatformRecruit = async () => {
    const { data } = await api.getStorage(storageKey);
    const editorOutputData = data.valueMap.editorData;

    const modifiedData = JSON.parse(
      decodeHTMLEntities(removeWrongAmpString(JSON.stringify(editorOutputData))),
    );

    return modifiedData;
  };

  useEffect(() => {
    const setPlatformRecruit = async () => {
      try {
        const newPlatformRecruit = await getPlatformRecruit();
        setSavedEditorData(newPlatformRecruit);
      } catch (error) {
        handleAddToast({
          type: ToastType.error,
          message: '모집공고를 불러오지 못했습니다. 다시 시도해주세요.',
        });
        return getDefaultEditorData();
      }
    };

    setPlatformRecruit();
  }, [storageKey]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>모집공고</Styled.Heading>
      <Styled.EditorWrapper>
        <Editor id={EDITOR_ID} savedData={savedEditorData} />
        <EditorAside
          platform={
            <Styled.TeamSelect
              placeholder="플랫폼 선택"
              defaultValue={teamSelectOptions[0]}
              size={SelectSize.sm}
              options={teamSelectOptions}
              onChangeOption={(option) => setSelectedPlatform(option.label.toLowerCase())}
            />
          }
          rightActionButton={{
            text: '수정',
            onClick: handleUpdateButtonClick,
            isLoading,
          }}
        />
      </Styled.EditorWrapper>
    </Styled.PageWrapper>
  );
};

export default UpdatePlatformRecruit;
