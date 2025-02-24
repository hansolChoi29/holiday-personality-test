// PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

const PrivateRoute = () => {
  const { user, login } = useUserStore(); // Zustand에서 user와 login 함수 가져오기
const [loading, setLoaging]=useState(true) //<= 그냥 실험임
  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰 확인

    if (token) {
      // 로컬스토리지에 토큰이 있을 경우, supabase 세션 복원
      supabase.auth.setSession({ access_token: token });

      // 비동기로 세션을 가져오는 함수
      const getSession = async () => {
        const { data, error } = await supabase.auth.getSession(); // 세션 가져오기
        if (error) {
          console.log("Error getting session:", error.message);
        } else if (data.session) {
          login(data.session.user); // Zustand에 유저 정보 저장
        }
        setLoaging(false)
      };

      getSession(); // 세션 복원 함수 호출
    } else {
      login(null)
      console.log('유저정보?:',data);
      setLoaging(false)
    }
  }, [login]); // 로그인 함수가 변경될 때마다 실행

  // 로딩중일때 렌더링 금지
  if(loading){
    return <div>로딩중...</div>
  }
  
  // user 상태가 없으면 로그인 페이지로 리디렉션
  if (!user) {
    alert("로그인 후 이용해주세요!");
    return <Navigate to="/" />; // 로그인되지 않은 경우 로그인 페이지로 리디렉션
  }

  return <Outlet />; // 인증된 사용자만 하위 라우트를 렌더링
};

export default PrivateRoute;
