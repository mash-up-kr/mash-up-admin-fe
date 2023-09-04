import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { OutputData } from '@editorjs/editorjs';
import { Editor, EditorAside } from '@/components';
import * as Styled from './FaqPage.styled';
import { $teams, $profile } from '@/store';
import { SelectSize } from '@/components/common/Select/Select.component';
import {
  decodeHTMLEntities,
  getDefaultEditorData,
  getLocalStorageData,
  removeWrongAmpString,
  request,
} from '@/utils';
import { useToast } from '@/hooks';
import { ToastType } from '@/components/common/Toast/Toast.component';
import * as api from '@/api';
import { Team } from '@/components/common/UserProfile/UserProfile.component';

const EDITOR_ID = 'platform-faq-editor';
const commonSelectOption = { label: '공통', value: 'common' };

const FaqPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [savedEditorData, setSavedEditorData] = useState<OutputData>(getDefaultEditorData());
  const [selectedPlatform, setSelectedPlatform] = useState(commonSelectOption.value);
  const storageKey = `faq-${selectedPlatform}`;

  const { handleAddToast } = useToast();
  const teams = useRecoilValue($teams);
  const teamOptions = teams.map(({ teamId, name }) => ({
    value: teamId.toString(),
    label: name,
  }));

  const myTeamName = useRecoilValue($profile)[0];
  const isStaffUser = myTeamName === Team.mashUp;

  const getTeamSelectOptions = () => {
    if (isStaffUser) return [{ label: commonSelectOption.label, value: commonSelectOption.value }];
    const myTeamOptionObject = teamOptions.find(({ label }) => label.toUpperCase() === myTeamName);
    return [myTeamOptionObject ?? commonSelectOption];
  };

  const teamSelectOptions = getTeamSelectOptions();

  const handleUpdateButtonClick = async () => {
    const originalOutputData = getLocalStorageData(EDITOR_ID);
    const storageValue = { editorData: originalOutputData };

    request({
      requestFunc: () => {
        setIsLoading(true);
        return api.postStorage({ keyString: storageKey, valueMap: storageValue });
      },
      errorHandler: () => {
        handleAddToast({
          type: ToastType.error,
          message: '자주 묻는 질문을 저장하지 못했습니다. 다시 시도해주세요.',
        });
      },
      onSuccess: () => {
        handleAddToast({
          type: ToastType.success,
          message: '성공적으로 자주 묻는 질문을 저장했습니다.',
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
    const myTeamSelectOptions = teamSelectOptions[0] ?? commonSelectOption;

    if (myTeamSelectOptions.value === commonSelectOption.value) {
      setSelectedPlatform(commonSelectOption.value);
    } else {
      setSelectedPlatform(myTeamSelectOptions.label.toLowerCase());
    }
  }, [teamSelectOptions]);

  useEffect(() => {
    const setPlatformRecruit = async () => {
      try {
        const newPlatformRecruit = await getPlatformRecruit();
        setSavedEditorData(newPlatformRecruit);
      } catch (error) {
        handleAddToast({
          type: ToastType.error,
          message: '자주 묻는 질문을 불러오지 못했습니다. 다시 시도해주세요.',
        });
        return getDefaultEditorData();
      }
    };

    setPlatformRecruit();
  }, [storageKey]);

  return (
    <Styled.PageWrapper>
      <Styled.Heading>자주 묻는 질문</Styled.Heading>
      <Styled.EditorWrapper>
        <Editor id={EDITOR_ID} savedData={savedEditorData} />
        <EditorAside
          platform={
            <Styled.TeamSelect
              placeholder="플랫폼 선택"
              defaultValue={teamSelectOptions[0]}
              size={SelectSize.sm}
              options={teamSelectOptions}
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

export default FaqPage;
