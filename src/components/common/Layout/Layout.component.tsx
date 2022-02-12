import React, { ReactNode } from 'react';
import { Header } from '@/components';
import * as Styled from './Layout.styled';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </>
  );
};

export default Layout;
