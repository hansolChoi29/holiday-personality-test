import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const SignUpBox = styled.div`
  width: 400px;
  height: auto;
  border-radius: 20px;
  background-color: #e3e3e3;
  padding: 15px;
  margin:auto;
`;

const SignUpTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
`;

const InputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #666;
  text-align: left;
  padding: 10px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin-top: 7px;
  margin-bottom: 23px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  background-color: #f6f6f6;
  outline: none;
  &:focus {
    border-color: #ffffff;
    background-color: #fff;
  }
`;

const SignUpBtn = styled.button`
  width: 250px;
  padding: 10px;
  margin: 20px auto;
  background-color: #d84137;
  color: #333;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ffffff;
  &:hover {
    background-color: #67a53b;
    color: #000;
  }
`;

const JoinPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    // 인증상태 체크
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 회원가입
  const signUpNewUser = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (!nickname) {
        alert('닉네임을 입력해주세요.');
        return;
      }

      const { data: nicknameData, error: nicknameError } = await supabase
        .from('user')
        .select('*')
        .eq('nickname', nickname)
        .single();

      if (nicknameData) {
        alert('중복된 닉네임이 존재합니다.');
        return;
      }

      if (password.length < 8) {
        alert('비밀번호 8자 이상 입력해 주세요.');
        return;
      }

      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      if (error) {
        console.error('회원가입 에러 => ', error);
        alert('회원가입 에러');
        return;
      }

      // 닉네임 저장
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, nickname }]);

      if (insertError) {
        console.error('닉네임 저장 에러 => ', insertError);
        alert('닉네임 저장 에러');
        return;
      }

      alert('회원가입 완료');

      setIsSignUpMode(false);
      setEmail('');
      setPassword('');
      setNickname('');
    } catch (error) {
      console.log('회원가입 에러 => ', error);
    }
  };

  if (!user) {
    return (
      <SignUpBox>
        <SignUpTitle>회원가입</SignUpTitle>
        <InputForm onSubmit={signUpNewUser}>
          <InputLabel htmlFor="email">Email:</InputLabel>
          <Input type="email" placeholder="Email" value={email} onChange={onChangeEmail} />
          <InputLabel htmlFor="password">password:</InputLabel>
          <Input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
          <InputLabel htmlFor="PasswordConfirm">PasswordConfirm:</InputLabel>
          <Input
            type="password"
            placeholder="PasswordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <InputLabel htmlFor="Nickname">Nickname:</InputLabel>
          <Input type="text" placeholder="Nickname" value={nickname} onChange={onChangeNickname} />
          <SignUpBtn>회원가입</SignUpBtn>
        </InputForm>
      </SignUpBox>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default JoinPage;
