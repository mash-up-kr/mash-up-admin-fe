import React from 'react';
import { formatDate, getReadableIndex, parsePlaceholderWhenEmpty } from '@/utils';
import * as Styled from './ContentListItem.styled';
import { Content } from '@/types';

interface ContentListItemProps extends Content {
  index: number;
}

const ContentListItem = ({ index, title, content, startedAt }: ContentListItemProps) => {
  return (
    <Styled.ContentListItem>
      <Styled.Row>
        <Styled.IndexBadge>{getReadableIndex(index)}</Styled.IndexBadge>
        <Styled.Title>{title}</Styled.Title>
        <Styled.StartedAt>{formatDate(startedAt, 'A hh:mm')}</Styled.StartedAt>
      </Styled.Row>
      <Styled.Content>{parsePlaceholderWhenEmpty(content)}</Styled.Content>
    </Styled.ContentListItem>
  );
};

export default ContentListItem;
