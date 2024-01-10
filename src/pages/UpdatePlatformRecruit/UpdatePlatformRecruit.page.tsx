import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { OutputData } from '@editorjs/editorjs';
import { Editor, EditorAside } from '@/components';
import * as Styled from './UpdatePlatformRecruit.styled';
import { $profile, $teams } from '@/store';
import { SelectSize } from '@/components/common/Select/Select.component';
import { decodeHTMLEntities, getDefaultEditorData, removeWrongAmpString, request } from '@/utils';
import { useToast } from '@/hooks';
import { ToastType } from '@/components/common/Toast/Toast.component';
import * as api from '@/api';
import { Team } from '@/components/common/UserProfile/UserProfile.component';

const EDITOR_ID = 'platform-recruit-editor';

const UpdatePlatformRecruit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [savedEditorData, setSavedEditorData] = useState<OutputData>(getDefaultEditorData());
  const [selectedPlatform, setSelectedPlatform] = useState('design');
  const storageKey = `recruit-${selectedPlatform}`;

  const { handleAddToast } = useToast();

  const teams = useRecoilValue($teams);
  const myTeamName = useRecoilValue($profile)[0].toUpperCase();
  const isStaffMember = myTeamName === Team.mashUp || myTeamName === Team.branding;

  const myTeamInfo = isStaffMember
    ? null
    : teams.find(({ name }) => name.toUpperCase() === myTeamName);

  const myTeamOption = {
    value: (myTeamInfo?.teamId ?? '').toString(),
    label: myTeamInfo?.name ?? '',
  };

  const allTeamOptions = teams.map(({ teamId, name }) => ({
    value: teamId.toString(),
    label: name,
  }));

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
    if (myTeamInfo?.name) {
      setSelectedPlatform(myTeamInfo?.name.toLowerCase());
    }
  }, [myTeamInfo]);

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
              defaultValue={isStaffMember ? allTeamOptions[0] : myTeamOption}
              size={SelectSize.sm}
              options={isStaffMember ? allTeamOptions : [myTeamOption]}
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
