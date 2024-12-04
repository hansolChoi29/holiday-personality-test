import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

  // 특정 경로에서는 Header 숨기기
  const hideHeaderPaths = ['/', '/joinpage'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
