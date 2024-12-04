import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import background1 from '/background1.png';
import styled from 'styled-components';
// #D84137
// #67A53B
// #F9F468
// Styled Components
const Background = styled.div`
  background-image: url(${background1});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NicknameContainer = styled.div`
  position: absolute;
  top: 20%;
  width: 600px;
  height: 40px;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const NicknameInput = styled.input`
  font-size: 16px;
  padding: 5px 10px;
  text-align: center;
  border: none;
  border-radius: 15px;
  outline: none;
`;

const NicknameText = styled.p`
  font-size: 20px;
  text-align: center;
  margin: 0;
`;

const EditnButton = styled.button`
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  position: absolute;
  right: 10%;

  top: 20%;
  height: 40px;
  cursor: pointer;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ResultCard = styled.div`
  background-color: #f9f468; /* 노란색 배경 */
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  height: 150px;
  display: grid;
`;

const ResultTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const Tag = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: ${(props) => (props.type === 'best' ? '#D84137' : '#67A53B')};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  background-color: transparent;
  border: none;
  color: #d84137; /* 빨간색 */
  cursor: pointer;
`;
const EditsButton = styled.button`
  height: 30px;
  border-radius: 10px;
  margin: 5px;
  border: none;
  width: 50px;
`;
const EditcButton = styled.button`
  height: 30px;
  width: 50px;
  border-radius: 10px;
  margin: 5px;
  border: none;
`;
const Mypage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [results, setResults] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [error, setError] = useState(null);

  // 로그인 상태 확인 및 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.session) {
          alert('로그인이 필요합니다.');
          navigate('/');
          return;
        }

        const userId = session.session.user.id;

        // 닉네임 가져오기
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('nickname')
          .eq('id', userId)
          .single();
        if (userError) throw userError;
        setNickname(userData.nickname);
        setNewNickname(userData.nickname);

        // 결과 가져오기
        const { data: resultsData, error: resultsError } = await supabase
          .from('results')
          .select('id, mbtititle, besttag, badtag')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(2);
        if (resultsError) throw resultsError;
        setResults(resultsData || []);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      }
    };

    fetchData();
  }, [navigate]);

  // 닉네임 수정 저장
  const handleNicknameSave = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session.user.id;

      if (!newNickname.trim()) {
        alert('닉네임을 입력해주세요!');
        return;
      }

      const { error } = await supabase.from('users').update({ nickname: newNickname }).eq('id', userId);

      if (error) throw error;

      setNickname(newNickname);
      setIsEditing(false);
      alert('닉네임이 성공적으로 수정되었습니다!');
    } catch (err) {
      console.error('Error updating nickname:', err.message);
      setError(err.message);
    }
  };

  // 결과 삭제
  const handleDeleteResult = async (id) => {
    try {
      const { error } = await supabase.from('results').delete().eq('id', id);
      if (error) throw error;

      setResults((prevResults) => prevResults.filter((result) => result.id !== id));
      alert('결과가 성공적으로 삭제되었습니다!');
    } catch (err) {
      console.error('Error deleting result:', err.message);
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Background>
      <NicknameContainer>
        {isEditing ? (
          <>
            <NicknameInput type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} />
            <EditsButton onClick={handleNicknameSave}>저장</EditsButton>
            <EditcButton onClick={() => setIsEditing(false)}>취소</EditcButton>
          </>
        ) : (
          <>
            <NicknameText>{nickname || '닉네임 없음'}</NicknameText>
            <EditnButton onClick={() => setIsEditing(true)}>닉네임 수정</EditnButton>
          </>
        )}
      </NicknameContainer>
      <ResultsContainer>
        {results.map((result) => (
          <ResultCard key={result.id}>
            <ResultTitle>{result.mbtititle}</ResultTitle>
            <Tag type="best"># {result.besttag}</Tag>
            <Tag type="bad"># {result.badtag}</Tag>
            <DeleteButton onClick={() => handleDeleteResult(result.id)}>삭제</DeleteButton>
          </ResultCard>
        ))}
      </ResultsContainer>
    </Background>
  );
};

export default Mypage;
