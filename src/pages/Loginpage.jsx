import { useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import daeeun_kong from '/daeeun_kong.gif';
import tree from '/tree.png';
import title from '/title.png';
import styled from 'styled-components';
const Containerwithcard = styled.div`
  position: relative;
  margin-top: 350px;
`;
const Container = styled.div`
  position: absolute;
  transform: translateY(-70%);
  margin-left: 180px;
`;

const Gifimg = styled.img`
  position: absolute;
  transform: translate(-80px, 170px);
  width: 100px;
  height: 100px;
  z-index: 10;
`;

const Treeimg = styled.img`
  position: absolute;
  bottom: 0;
  width: 400px;
  height: 450px;
  margin-left: 20px;
`;
const Box = styled.div`
  width: 400px;
  height: 500px;
  border-radius: 20px;
  background-color: #e3e3e3;
  transform: translateY(-30%);
  right: 150px;
  padding: 15px;
  position: absolute;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
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

const Btn = styled.button`
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

const SignUpGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-top: 10px;
`;

const SignUpBtn = styled.button`
  width: 150px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #e3e3e3;
  color: #333;
  border: none;
  border-radius: 20px;
  font-size: 14px;

  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    color: #d84137;
  }
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
      <Containerwithcard>
        <Container>
          <img src={title}></img>
          <Gifimg src={daeeun_kong}></Gifimg>
        </Container>
        <Box>
          <Title>Login</Title>
          <Form onSubmit={handleLogin}>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Btn type="submit">로그인</Btn>
          </Form>

          <SignUpGroup>
            <p>계정이 없으신가요?</p>
            <SignUpBtn onClick={handleSingup}>회원가입</SignUpBtn>
          </SignUpGroup>
        </Box>
      </Containerwithcard>
      <Treeimg src={tree}></Treeimg>
    </div>
  );
};

export default Login;
