import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import snowman from '/snowman.png';
import socks from '/socks.png';
import star from '/star.png';
import tree2 from '/tree2.png';
import ball from '/ball.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import background1 from '/background1.png';
import daeeun_kong from '/daeeun_kong.gif';
// Styled Components
const PageWrapper = styled.div`
  background-image: url(${background1}); /* 배경 이미지 설정 */
  background-size: cover; /* 배경 이미지를 전체 화면에 맞춤 */
  background-repeat: no-repeat; /* 배경 이미지 반복 방지 */
  background-position: center; /* 배경 이미지 중앙 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이 */
  width: 100%; /* 전체 화면 너비 */
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 레이아웃 충돌 방지 */
`;

const ResultContainer = styled.div`
  width: 400px;
  height: 550px;
  padding: 20px;
  background-color: #67a53b;
  border-radius: 20px;
  border: 15px solid #d84137;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Title = styled.p`
  font-size: 20px;
  background-color: white;
  border-radius: 10px;
  font-weight: bold;
  color: black;
  text-align: center;
  padding: 5px;
  width: 50%;
  margin: 10px 0;
`;

const Description = styled.p`
  width: 90%;
  padding: 15px;
  border-radius: 15px;
  text-align: justify;
  color: #333;
  font-weight: bold;
  font-size: 15px;
  background-color: white;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  display: flex; /* Flexbox로 가로 배치 */
  gap: 20px; /* 태그 간 간격 */
  justify-content: center; /* 중앙 정렬 */
  margin-bottom: 20px; /* 아래 요소와 간격 */
`;
const Besttag = styled.p`
  background-color: white;
  border-radius: 10px;
  font-size: 15px;
  width: 150px; /* 고정된 너비 */
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10%;
  top: 64%;
  color: #b82218;
  font-weight: bold;
`;
const Badtag = styled.p`
  background-color: white;
  border-radius: 10px;
  font-size: 15px;
  width: 150px; /* 고정된 너비 */
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 55%;
  top: 64%;
  color: #67a53b;
  font-weight: bold;
`;

const TagLabelbad = styled.p`
  font-size: 14px;
  color: #f9f468;
  font-weight: bold;
  text-align: center;
  position: absolute;
  right: 12%;
  top: 63%;
  margin: 0; /* 태그와의 간격 제거 */
`;

const TagLabelbest = styled.p`
  font-size: 14px;
  color: #f9f468;
  font-weight: bold;
  text-align: center;
  position: absolute;
  right: 62%;
  top: 63%;
  margin: 0;
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
  margin: 10px;
`;
const Replay = styled(Link)`
  width: 150px;
  background-color: #f9f468;
  color: #08323f;
  padding: 15px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  &:hover {
    background-color: #f9f468;
    color: red;
  }
`;
const Daeeun_kong = styled.img``;
const Results = () => {
  const [userResult, setUserResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Supabase 세션 확인
        const {
          data: { session },
          error
        } = await supabase.auth.getSession();
        if (error || !session) {
          throw new Error('로그인 세션이 없습니다. 다시 로그인해주세요.');
        }

        const userId = session.user.id;

        // Supabase에서 사용자 결과 가져오기
        const { data, error: fetchError } = await supabase
          .from('results')
          .select('mbtititle, description, besttag, badtag')
          .eq('id', userId)
          .single();

        if (fetchError) throw new Error(fetchError.message);

        setUserResult(data); // 결과 저장
      } catch (err) {
        setError(err.message);
        window.location.href = '/Login'; // 로그인 페이지로 리디렉션 수정했슴!!
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
      <Daeeun_kong src={daeeun_kong}></Daeeun_kong>
      <Daeeun_kong src={daeeun_kong}></Daeeun_kong>
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
            <TagContainer>
              <div>
                <TagLabelbest>연락 안 될 친구</TagLabelbest>
                <Besttag>{userResult.besttag}</Besttag> {/* 설명 */}
              </div>
              <TagLabelbad>같이 눈사람 만들 친구</TagLabelbad>
              <Badtag>{userResult.badtag}</Badtag> {/* 설명 */}
            </TagContainer>
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
      <Daeeun_kong src={daeeun_kong}></Daeeun_kong>
      <Daeeun_kong src={daeeun_kong}></Daeeun_kong>
    </PageWrapper>
  );
};

export default Results;
