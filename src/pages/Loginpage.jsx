import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // 로그인 전 상태
  const loginUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data?.user) {
      setUser(data.user);
      handleHome();
    } else {
      console.error("이메일 또는 패스워드 일치하지않음.");
    }
  };

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const handleHome = () => {
    navigate("./home");
  };
  const handleSingup = () => {
    navigate("/joinpage");
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit" onClick={handleSingup}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Loginpage;
