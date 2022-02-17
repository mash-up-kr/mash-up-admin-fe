import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import * as Styled from './LoginPage.styled';
import Logo from '@/assets/svg/logo-admin-272.svg';
import MinsourLogo from '@/assets/svg/minsour-logo-200.svg';
import { Button, Input } from '@/components';
import { InputSize } from '@/components/common/Input/Input.component';
import { ButtonShape } from '@/components/common/Button/Button.component';
import { handlePostLogin } from '@/api/login';
import { $me } from '@/store/login';
import { ACCESS_TOKEN } from '@/constants';

const ERROR_MESSAGE = {
  INVALID_USERNAME: '아이디를 입력해주세요.',
  INVALID_PASSWORD: '비밀번호를 입력해주세요.',
  AUTH_FAILED: '아이디 또는 비밀번호를 잘못 입력했습니다.',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // TODO:(용재) react-hook-form 으로 로직 변경
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setMe = useSetRecoilState($me);

  const handleSetError = (param: string) => {
    setError(param);
  };

  const handleSetUsername = (param: string) => {
    setUsername(param);
  };
  const handleSetPassword = (param: string) => {
    setPassword(param);
  };

  // TODO:(용재) POST는 recoil selector set에서 async 가 안되는 이슈가 있어서 어떻게 관리할지 생각해봐야 함
  const handleLogin = async () => {
    try {
      if (username.length === 0) {
        return handleSetError(ERROR_MESSAGE.INVALID_USERNAME);
      }
      if (password.length === 0) {
        return handleSetError(ERROR_MESSAGE.INVALID_PASSWORD);
      }
      // TODO:(용재) username, password validation 추가
      const { data } = await handlePostLogin({ username, password });

      setMe(data);

      localStorage.setItem(ACCESS_TOKEN, data.accessToken);

      // TODO:(용재) PATH.APPLICATION 로 변경
      navigate('/application');
    } catch (e) {
      handleSetError(ERROR_MESSAGE.AUTH_FAILED);
    }
  };

  const handleCheckEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Styled.LoginPageWrapper>
      <Styled.LoginContainer isError={!!error} onSubmit={handleCheckEnter}>
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
        <Button type="submit" shape={ButtonShape.primary} label="로그인" />
        <MinsourLogo />
      </Styled.LoginContainer>
    </Styled.LoginPageWrapper>
  );
};

export default LoginPage;
