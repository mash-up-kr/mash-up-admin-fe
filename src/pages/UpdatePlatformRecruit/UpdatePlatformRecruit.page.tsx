import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Editor, EditorAside } from '@/components';
import * as Styled from './UpdatePlatformRecruit.styled';
import { $teams } from '@/store';
import { SelectSize } from '@/components/common/Select/Select.component';
import { postStorage } from '@/api/storage';

const UpdatePlatformRecruit = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const teams = useRecoilValue($teams);
  const teamOptions = teams.map((team) => ({
    value: team.teamId.toString(),
    label: team.name,
  }));

  const editorId = 'platform-recruit-editor';

  return (
    <Styled.PageWrapper>
      <Styled.Heading>리쿠르트 모집공고 수정</Styled.Heading>
      <Styled.EditorWrapper>
        <Editor id={editorId} />
        <EditorAside
          platform={
            <Styled.TeamSelect
              placeholder="플랫폼 선택"
              size={SelectSize.sm}
              options={teamOptions}
              onChangeOption={(option) => setSelectedPlatform(option.label.toLowerCase())}
            />
          }
          rightActionButton={{
            text: '수정',
            onClick: async () => {
              await postStorage({
                keyString: `recruit-${selectedPlatform}`,
                valueMap: {
                  editorData: localStorage.getItem(editorId) ?? '',
                },
              });

              // 리크루트 사용 형태
              // const { data } = await getStorage(`recruit-${selectedPlatform}`);
              // JSON.parse(data.valueMap.editorData.replace(/&quot;/g, '"').replace(/^"|"\s*$/g, ''))
            },
          }}
        />
      </Styled.EditorWrapper>
    </Styled.PageWrapper>
  );
};

export default UpdatePlatformRecruit;
