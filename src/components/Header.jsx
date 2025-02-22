import { Link, useNavigate } from 'react-router-dom';
import Logo2 from '../assets/logo2.svg';
import styled from 'styled-components';
import { supabase } from '../supabase/supabase';
import { useUserStore } from '../zustand/useUserStore';

const LayoutContainer = styled.div`
  max-width: 100%;
  background-color: #b82218;
  display: flex;
  align-items: center;
  padding: 10px 54px;
  color: #fff;
`;

const LogoImg = styled.img`
  width: 298px;
  height: auto;
  margin-right: 20px;
  filter: brightness(0) invert(1);
`;
const NavContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-left: auto;
`;

const Text = styled.button`
  cursor: pointer;
  border: none;
  background-color: #b82218;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

const LinkMyPage = styled(Link)`
  color: #fff;
  text-decoration-line: none;
`;

const Header = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      console.log('Sign out successful');
      alert('로그아웃 되었습니다.');
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error during sign out:', error.message);
    }
  };

  return (
    <LayoutContainer>
      <button onClick={()=>navigate('/testpage')}>
      <LogoImg src={Logo2} alt="Logo" />
      </button>
      <NavContainer>
        <Text onClick={signOutUser}>LOGOUT</Text>
        <Text>
          
          <LinkMyPage to="/mypage">MY PAGE</LinkMyPage>
        </Text>
      </NavContainer>
    </LayoutContainer>
  );
};

export default Header;
