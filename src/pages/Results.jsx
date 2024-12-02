import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import snowman from '/snowman.png';
import socks from '/socks.png';
import star from '/star.png';
import tree2 from '/tree2.png';
import ball from '/ball.png';
import gjh from '/gjh.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */
  width: 100%; /* 전체 화면 너비 */
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 레이아웃 충돌 방지 */
  background-color: #f5f5f5; 원하는 배경색
`;

const ResultContainer = styled.div`
  width: 700px;
  height: 350px;
  padding: 20px;
  background-color: #67a53b;
  border-radius: 20px;
  border: 15px solid #d84137;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.p`
  font-size: 20px;
  background-color: white;
  border-radius: 10px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 20px;
  width: 150px;
  position: absolute;
  left: 45%;
  top: 30%;
`;

const Description = styled.p`
  width: 600px;
  height: 100px;
  border-radius: 20px;
  text-align: justify;
  align-items: center;
  padding: 15px;

  color: #333;
  font-size: 18px;
  background-color: white;
`;

const ImageRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: ${(props) => (props.position === 'top' ? '0 0 20px' : '20px 0 0')};
`;

const StyledImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  justify-content: space-around;
`;
const Replay = styled(Link)`
  width: 100px; /* 버튼 너비 제한 */
  background-color: white;
  color: black;
  padding: 10px 0; /* 상하 여백 */
  text-decoration: none; /* 기본 밑줄 제거 */
  border: 1px solid black;
  border-radius: 5px;
  font-size: 14px; /* 폰트 크기 */
  font-weight: bold;
  text-align: center; /* 텍스트 중앙 정렬 */
  display: block; /* 블록처럼 보이는 인라인 요소 */
  margin: 10px auto; /* 수평 중앙 정렬 */
  &:hover {
    background-color: white;
    color: #d84137;
  }
`;
const Gjhimg = styled.img`
  width: 400px;
  height: 300px;
  margin: 20px;
  position: absolute; /* 절대 위치 지정 */
  bottom: 0; /* 화면 맨 아래 */
  left: 0; /* 화면 왼쪽 */
`;
const Results = () => {
  const [userResult, setUserResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // 로컬스토리지에서 세션 데이터 가져오기
        const sessionData = localStorage.getItem('supabase.auth.token');
        if (!sessionData) {
          throw new Error('사용자가 로그인되지 않았습니다. 다시 로그인해주세요.');
        }

        const session = JSON.parse(sessionData);
        const userId = session.user.id; // 로그인된 사용자 ID 가져오기

        // Supabase에서 사용자 결과 가져오기
        const { data, error } = await supabase
          .from('results')
          .select('mbtititle, description')
          .eq('id', userId)
          .single();

        if (error) throw new Error(error.message);

        setUserResult(data); // 결과 저장
      } catch (err) {
        setError(err.message);
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper>
      <ResultContainer>
        {userResult ? (
          <>
            {/* 상단 이미지 */}
            <ImageRow position="top">
              <StyledImage src={star} alt="Star" />
              <StyledImage src={ball} alt="Ball" />
            </ImageRow>
            {/* 결과 타이틀 */}
            <Title>{userResult.mbtititle}</Title> {/* 타이틀 */}
            {/* 결과 설명 */}
            <Description>{userResult.description}</Description> {/* 설명 */}
            {/* 하단 이미지 */}
            <ImageRow position="bottom">
              <StyledImage src={snowman} alt="Snowman" />
              <StyledImage src={tree2} alt="Tree" />
              <StyledImage src={socks} alt="Socks" />
            </ImageRow>
          </>
        ) : (
          <p>No results found.</p>
        )}
        <Replay to="./testpate">다시해보기</Replay>
      </ResultContainer>
      <Gjhimg src={gjh} alt="gjh" />
    </PageWrapper>
  );
};

export default Results;
