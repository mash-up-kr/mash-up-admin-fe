import React, { useState } from 'react';

import * as Styled from './LoginPage.styled';
import Logo from '@/assets/svg/logo-admin-272.svg';
import MinsourLogo from '@/assets/svg/minsour-logo-200.svg';
import { Button, Input } from '@/components';
import { InputSize } from '@/components/common/Input/Input.component';
import { ButtonShape } from '@/components/common/Button/Button.component';
import { handlePostLogin } from '@/api/login';

const ERROR_MESSAGE = {
  INVALID_USERNAME: '아이디를 입력해주세요.',
  INVALID_PASSWORD: '비밀번호를 입력해주세요.',
  AUTH_FAILED: '아이디 또는 비밀번호를 잘못 입력했습니다.',
};

const LoginPage = () => {
  const [error, setError] = useState('');
  // TODO:(용재) react-hook-form 으로 로직 변경
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSetError = (param: string) => {
    setError(param);
  };

  const handleSetUsername = (param: string) => {
    setUsername(param);
  };
  const handleSetPassword = (param: string) => {
    setPassword(param);
  };

  const handleLogin = async () => {
    try {
      if (username.length) {
        handleSetError(ERROR_MESSAGE.INVALID_USERNAME);
      }
      if (password.length) {
        handleSetError(ERROR_MESSAGE.INVALID_PASSWORD);
      }
      // TODO:(용재) username, password validation 추가
      await handlePostLogin({ username, password });
      // TODO:(용재) login 성공 후 토큰 저장 및 페이지 이동 이벤트 추가
    } catch (e) {
      handleSetError(ERROR_MESSAGE.AUTH_FAILED);
    }
  };

  const handleCheckEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Styled.LoginPageWrapper>
      <Styled.LoginContainer isError={!!error} onKeyPress={handleCheckEnter}>
        <Logo />
        <div>
          <Input
            $size={InputSize.md}
            id="id"
            placeholder="아이디를 입력해주세요"
            label=""
            onChange={(e) => handleSetUsername(e.target.value)}
            onFocus={() => handleSetError('')}
          />
          <Input
            type="password"
            $size={InputSize.md}
            id="password"
            placeholder="비밀번호를 입력해주세요"
            label=""
            errorMessage={error}
            onChange={(e) => handleSetPassword(e.target.value)}
            onFocus={() => handleSetError('')}
          />
        </div>
        <Button shape={ButtonShape.primary} label="로그인" onClick={handleLogin} />
        <MinsourLogo />
      </Styled.LoginContainer>
    </Styled.LoginPageWrapper>
  );
};

export default LoginPage;
