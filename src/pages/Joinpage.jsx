import { useState } from 'react';
import { supabase } from '../supabase/supabase';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import daeeun_kong from '/daeeun_kong.gif';
import background1 from '/background1.png';

const WrappedBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const BackgroundSnow = styled.img`
  background-image: url(${background1});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: auto;
  border-radius: 20px;
  background-color: white;
  padding: 15px;
  margin: auto;
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

const Input = styled.input`
  padding: 10px;
  margin-top: 7px;
  margin-bottom: 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  background-color: #f6f6f6;
  outline: none;
  &:focus {
    border-color: #ccc;
    background-color: #fff;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SignUpBtn = styled.button`
  width: 250px;
  padding: 10px;
  margin: 20px auto;
  background-color: #f9f468;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: black;
  &:hover {
    background-color: #67a53b;
    color: #000;
  }
`;

const CharacterImage = styled.img`
  width: 100px;
  height: 100px;
  margin: auto;
`;

const JoinPage = () => {
  const navigate = useNavigate();

  const [formStates, setFormStates] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: ''
  });

  // 입력값 관리 함수
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormStates({
      ...formStates,
      [name]: value
    });

    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: ''
  });

  // 회원가입
  const signUpNewUser = async (e) => {
    e.preventDefault();
    let hasError = false;

    // 입력 데이터 검증
    if (!formStates.email) {
      setFormErrors({
        ...formErrors,
        email: '이메일을 입력해주세요.'
      });
      hasError = true;
      return;
 
    } else {

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formStates.email)) {
        setFormErrors({
          ...formErrors,
          email: '이메일 형식이 올바르지 않습니다.'
        });

        hasError = true;
        return;
      }
    }

    if (formStates.password.length < 8) {
      setFormErrors({
        ...formErrors,
        password: '비밀번호를 8자 이상 입력해 주세요.'
      });
      hasError = true;
      return;
    }

    if (formStates.password !== formStates.passwordConfirm) {
      setFormErrors({
        ...formErrors,
        passwordConfirm: '비밀번호가 일치하지 않습니다.'
      });
      hasError = true;
      return;
    }

    if (!formStates.nickname) {
      setFormErrors({
        ...formErrors,
        nickname: '닉네임을 입력해주세요.'
      });
      hasError = true;
      return;
    }

    try {
      // 닉네임 중복 체크
      const { data: nicknameData, error: nicknameError } = await supabase
        .from('users')
        .select('*')
        .eq('nickname', formStates.nickname)

      if (nicknameData && nicknameData.length > 0) {
        setFormErrors({
          ...formErrors,
          nickname: '중복된 닉네임이 존재합니다.'
        });
        hasError = true;
        return;
      }

      // 회원가입 진행
      const { data, error } = await supabase.auth.signUp({
        email: formStates.email,
        password: formStates.password
      });

      if (error) {
        console.error('회원가입 에러 => ', error.message);
        alert('회원가입 에러');
        return;
      }

      // 닉네임 저장
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, nickname: formStates.nickname }]);

      if (insertError) {
        console.error('닉네임 저장 에러 => ', insertError.message);
        alert('닉네임 저장 에러');
        return;
      }

      setFormStates({
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: ''
      });

      setFormErrors({
        email: '',
        password: '',
        nickname: '',
        passwordConfirm: ''
      });

      alert('회원가입 성공!');

      navigate('/');
    } catch (error) {
      console.log('회원가입 에러 => ', error);
    }
  };

  return (
    <WrappedBox>
      <BackgroundSnow src={background1} />
      <SignUpBox>
        <SignUpTitle>Join</SignUpTitle>
        <InputForm onSubmit={signUpNewUser}>
          <Input type="text" placeholder="Email" name="email" value={formStates.email} onChange={onChangeHandler} />
          {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formStates.password}
            onChange={onChangeHandler}
          />
          {formErrors.password && <ErrorMessage>{formErrors.password}</ErrorMessage>}
          <Input
            type="password"
            placeholder="PasswordConfirm"
            name="passwordConfirm"
            value={formStates.passwordConfirm}
            onChange={onChangeHandler}
          />
          {formErrors.passwordConfirm && <ErrorMessage>{formErrors.passwordConfirm}</ErrorMessage>}
          <Input
            type="text"
            placeholder="Nickname"
            name="nickname"
            value={formStates.nickname}
            onChange={onChangeHandler}
          />
          {formErrors.nickname && <ErrorMessage>{formErrors.nickname}</ErrorMessage>}
          <CharacterImage src={daeeun_kong} />
          <SignUpBtn>회원가입</SignUpBtn>
        </InputForm>
      </SignUpBox>
    </WrappedBox>
  );
};

export default JoinPage;
