import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  const location = useLocation();

  // 로그인, 회원가입 페이지에서는 헤더를 숨김
  const hideHeaderPaths = ['/', '/joinpage'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
