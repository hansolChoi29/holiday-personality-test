import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

const JoinPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [user, setUser] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    // 인증상태 체크
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 회원가입
  const signUpNewUser = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("회원가입 에러", error);
        alert("회원가입 에러");
        return;
      }

      // 닉네임 저장
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert([{ id: data.user.id, nickname }]);

      if (insertError) {
        console.error("닉네임 저장 에러", insertError);
        alert("닉네임 저장 에러");
        return;
      }

      alert("회원가입 완료");

      setIsSignUpMode(false);
      setEmail("");
      setPassword("");
      setNickname("");
    } catch (error) {
      console.log("회원가입 에러", error);
    }
  };

  // 로그인
  const signInUser = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("로그인 에러", error);
        alert("로그인 에러");
        return;
      }

      alert("로그인 완료");

      setIsSignUpMode(true);
    } catch (error) {
      console.log("로그인 에러", error);
    }
  };

  // 로그아웃
  const signOutUser = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setEmail("");
    setPassword("");
    setNickname("");
  };

  if (!user) {
    return (
      <div>
        {isSignUpMode ? (
          <form onSubmit={signUpNewUser}>
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={onChangeNickname}
            />
            <button>회원가입</button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <button type="button" onClick={signInUser}>
              로그인
            </button>
          </form>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {user.nickname}
        <button onClick={signOutUser}>로그아웃</button>
      </div>
    );
  }
};

export default JoinPage;
