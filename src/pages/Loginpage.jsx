// 로그인
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import daeeun_kong from '/daeeun_kong.gif';
import SnowMan from '../assets/snowman.svg';
import styled from 'styled-components';
import { useUserStore } from '../zustand/useUserStore';
// import Logo from '../assets/logo.svg';

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
  font-weight: bold;
  color: #08323f;
`;

const Login = () => {
  // zustand 상태 불러오기
  const { user, login, logout } = useUserStore();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // 정상작동하면 지우셈
  // useEffect(() => {
  //   console.log("User State Updated:", user); // user 상태가 업데이트 될 때마다 로그
  // }, [user]);

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      console.log('Login successful:', data);
      if (data && data.session) {
        
        localStorage.setItem('token', data.session.access_token);
        login(data.user);
        // zustand에 유저 정보 저장
        alert('로그인 성공!');
        navigate('/testpage'); // 페이지 이동
      } else {
        console.log('session not found in data');
        alert('로그인실패!')
      }
      
    } catch (error) {
      console.error('로그인 실패!', error.message);
      alert(`Login failed: ${error.message}`);
    }
  };
  // console.log("user", user);
  const handleLogout = () => {
    supabase.auth.signOut();
    login(null); // Zustand 상태 초기화
    alert('로그아웃 되었습니다.');
  };

  const handleSignup = () => {
    navigate('./joinpage');
  };

  return (
    <Container>
      {/* <LogoImg src={Logo} alt="Logo" /> */}
      <SnowManImg src={SnowMan} alt="SnowMan" />
      <Gifimg src={daeeun_kong} alt="Gif" />

      {user ? ( // 로그인 상태 확인
        // 로그인된 경우 버튼만 렌더링

        <Btn onClick={handleLogout}>로그아웃</Btn>
      ) : (
        // 로그인되지 않은 경우 로그인 박스 렌더링
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
            <SingupBtn onClick={handleSignup}>회원가입</SingupBtn>
          </SingupBox>
        </Box>
      )}
    </Container>
  );
};

export default Login;
