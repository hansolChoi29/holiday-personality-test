import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // 인증 토큰 확인

  if (!token) {
    return <Navigate to="/loginpage" />; // 로그인되지 않은 사용자는 로그인 페이지로 리디렉션
  }

  return <Outlet />; // 하위 라우트를 렌더링
};

export default PrivateRoute;
