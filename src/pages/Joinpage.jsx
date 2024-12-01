import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { Link } from 'react-router-dom';

const JoinPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    // 인증상태 체크
    const {
      data: { subscription }
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
        password
      });

      if (!nickname) {
        alert('닉네임을 입력해주세요.');
        return;
      }

      if (password.length < 8) {
        alert('비밀번호 8자 이상 입력해 주세요.');
        return;
      }

      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      if (error) {
        console.error('회원가입 에러 => ', error);
        alert('회원가입 에러');
        return;
      }

      // 닉네임 저장
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, nickname }]);

      if (insertError) {
        console.error('닉네임 저장 에러 => ', insertError);
        alert('닉네임 저장 에러');
        return;
      }

      alert('회원가입 완료');

      setIsSignUpMode(false);
      setEmail('');
      setPassword('');
      setNickname('');
    } catch (error) {
      console.log('회원가입 에러 => ', error);
    }
  };

  if (!user) {
    return (
      <div>
        <form onSubmit={signUpNewUser}>
          <input type="email" placeholder="Email" value={email} onChange={onChangeEmail} />
          <input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
          <input
            type="password"
            placeholder="PasswordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <input type="text" placeholder="Nickname" value={nickname} onChange={onChangeNickname} />
          <button>회원가입</button>
        </form>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default JoinPage;
