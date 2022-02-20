import React, { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { useForm } from 'react-hook-form';
import * as Styled from './LoginPage.styled';
import Logo from '@/assets/svg/logo-admin-272.svg';
import MinsourLogo from '@/assets/svg/minsour-logo-200.svg';
import { Button, Input } from '@/components';
import { InputSize } from '@/components/common/Input/Input.component';
import { ButtonShape } from '@/components/common/Button/Button.component';
import * as api from '@/api';
import { $me } from '@/store/login';
import { ACCESS_TOKEN } from '@/constants';

const ERROR_MESSAGE = {
  INVALID_USERNAME: '아이디를 입력해주세요.',
  INVALID_PASSWORD: '비밀번호를 입력해주세요.',
  AUTH_FAILED: '아이디 또는 비밀번호를 잘못 입력했습니다.',
};

interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [error, setError] = useState('');
  const { handleSubmit, register } = useForm<FormValues>();

  const handleSetError = (param: string) => {
    setError(param);
  };

  const handleLogin = useRecoilCallback(({ set }) => async ({ username, password }: FormValues) => {
    if (username.length === 0) {
      return handleSetError(ERROR_MESSAGE.INVALID_USERNAME);
    }
    if (password.length === 0) {
      return handleSetError(ERROR_MESSAGE.INVALID_PASSWORD);
    }

    try {
      const { data } = await api.postLogin({ username, password });

      localStorage.setItem(ACCESS_TOKEN, data.accessToken);
      set($me, data);
    } catch (e) {
      handleSetError(ERROR_MESSAGE.AUTH_FAILED);
    }
  });

  return (
    <Styled.LoginPageWrapper>
      <Styled.LoginContainer isError={!!error} onSubmit={handleSubmit(handleLogin)}>
        <Logo />
        <div>
          <Input
            {...register(`username`, { required: true })}
            $size={InputSize.md}
            id="id"
            placeholder="아이디를 입력해주세요"
            label=""
            onFocus={() => handleSetError('')}
          />
          <Input
            {...register(`password`, { required: true })}
            type="password"
            $size={InputSize.md}
            id="password"
            placeholder="비밀번호를 입력해주세요"
            label=""
            errorMessage={error}
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
