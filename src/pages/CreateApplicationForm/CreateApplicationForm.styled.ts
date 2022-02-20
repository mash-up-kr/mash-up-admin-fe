import styled from '@emotion/styled';
import { Select } from '@/components';

export const ApplicationFormControlPage = styled.div`
  padding: 2rem 0 4rem;

  & > form {
    display: flex;

    & > article {
      flex: 1;
    }

    & > aside {
      margin-left: 1.6rem;
    }
  }
`;

export const TeamSelect = styled(Select)`
  width: 100%;
`;
