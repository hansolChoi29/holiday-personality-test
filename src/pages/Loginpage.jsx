import { useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import daeeun_kong from '/daeeun_kong.gif';
import Logo from '../assets/logo.svg';
import SnowMan from '../assets/snowman.svg';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  height: 100vh; /* 화면 기준 높이 */
  background-color: #08323f;
  padding: 0;
  margin: 0;
  position: relative;
`;

const LogoImg = styled.img`
  position: absolute;
  width: 600px;
  height: auto;
  filter: brightness(0) invert(1);
  margin-top: 300px;
  left: 290px;
`;

const SnowManImg = styled.img`
  position: absolute;
  width: 650px;
  height: auto;
  left: 0px;
  bottom: 0px;
`;

const Gifimg = styled.img`
  position: absolute;
  width: 140px;
  height: 140px;
  z-index: 10;
  top: 130px;
  right: 300px;
`;

const Box = styled.div`
  margin-top: 220px;
  position: absolute;
  right: 290px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
  width: 330px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #08323f;
  margin-bottom: 27px;
  font-weight: bold;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px; /* 요소 간 간격 */
`;

const Input = styled.input`
  padding: 17px 26px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: #f3f3f3;
  color: #08323f;

  &:focus {
    outline: none;
    border-color: #08323f;
  }

  &::placeholder {
    font-size: 14px;
    color: #08323f;
  }
`;

const Btn = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #08323f;
  background-color: #f9f468;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e0d045;
  }
`;
const SingupBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 64px;
  font-size: 14px;
  color: #08323f;
`;

const SingupBtn = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      console.log('Login successful:', data);

      // 로그인 성공 시 세션 정보를 로컬스토리지에 저장
      localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));

      alert('Login successful!');
      navigate('/testpage'); // 페이지 이동
    } catch (error) {
      console.error('로그인실패!', error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleSingup = () => {
    navigate('./joinpage');
  };
  return (
    <div>
      <Container>
        <LogoImg src={Logo} alt="Logo" />
        <SnowManImg src={SnowMan} alt="SnowMan" />

        <Gifimg src={daeeun_kong}></Gifimg>

        <Box>
          <Title>Login</Title>
          <Form onSubmit={handleLogin}>
            <Input
              type="email"
              id="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              id="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Btn type="submit">로그인</Btn>
          </Form>

          <SingupBox>
            <p>계정이 없으신가요?</p>
            <SingupBtn onClick={handleSingup}>회원가입</SingupBtn>
          </SingupBox>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
