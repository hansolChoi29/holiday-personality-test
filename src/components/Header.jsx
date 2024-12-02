import { Link, Navigate } from 'react-router-dom';
import Logo2 from '../assets/logo2.svg';
import styled from 'styled-components';

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
  gap: 15px; /* 요소 간 간격 */
  margin-left: auto; /* 오른쪽 정렬 */
`;

const Text = styled.button`
  cursor: pointer;
`;

const Header = () => {
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('signout: ', { error }); // data는 딱히 필요없을 듯
    setUser(null);
    Navigate('/');
  };

  return (
    <LayoutContainer>
      <LogoImg src={Logo2} alt="Logo" />
      <NavContainer>
        <Text onClick={signOutUser}>LOGOUT</Text>
        <Text>
          <Link to="/mypage">MY PAGE</Link>
        </Text>
      </NavContainer>
    </LayoutContainer>
  );
};

export default Header;
