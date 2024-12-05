import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import snowman from '/snowman.png';
import socks from '/socks.png';
import star from '/star.png';
import tree2 from '/tree2.png';
import ball from '/ball.png';
import styled from 'styled-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import background1 from '/background1.png';
import daeeun_kong from '/daeeun_kong.gif';
import { useQuery } from '@tanstack/react-query';
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
//  merge
// merge test
// merge
const ResultContainer = styled.div`
  width: 400px;
  height: 650px;
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

const Description = styled.p`
  width: 90%;
  height: 250px; /* height를 auto로 변경 */
  padding: 15px; /* 내부 간격 증가 */
  line-height: 1.7; /* 줄 간격 조금 넓힘 */
  border-radius: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  font-weight: bold;
  font-size: 16px;
  background-color: white;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  display: flex; /* Flexbox로 가로 배치 */
  gap: 20px; /* 태그 간 간격 */
  justify-content: space-between; /* 태그를 좌우로 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%; /* 컨테이너 전체 너비 */
  margin: 20px 0; /* 위아래 간격 */
`;
const Besttag = styled.p`
  background-color: white;
  border-radius: 10px;
  font-size: 15px;
  width: 153px;
  height: 42px; /* 높이를 조금 더 넉넉하게 */
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  position: absolute;
  left: 12%;
  top: 70%;
  color: #b82218;
  font-weight: bold;
`;
const Badtag = styled.p`
  background-color: white;
  border-radius: 10px;
  font-size: 15px;
  width: 153px;
  height: 42px; /* 높이를 조금 더 넉넉하게 */
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 53%;
  top: 70%;
  color: #67a53b;
  font-weight: bold;
`;

const TagLabelbad = styled.p`
  font-size: 14px;
  color: #f9f468;
  font-weight: bold;
  text-align: center;
  position: absolute;
  right: 18%;
  top: 67%; /* 위치 미세 조정 */
  margin: 0;
`;

const TagLabelbest = styled.p`
  font-size: 14px;
  color: #f9f468;
  font-weight: bold;
  text-align: center;
  position: absolute;
  right: 54%;
  top: 67%; /* 위치 미세 조정 */
  margin: 0;
`;
const ImageRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: ${(props) => (props.position === 'top' ? '0 0 20px' : '20px 0 0')};
`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: 10px; /* 간격을 조금 줄임 */
`;
const StyledImage1 = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: 10px; /* 간격을 조금 줄임 */
  position: relative;
  top: 20px; /* 원하는 만큼 아래로 내림 */
`;
const Replay = styled.button`
  width: 150px;
  background-color: #f9f468;
  border: none;
  color: #08323f;
  padding: 10px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  bottom: 10px;
  &:hover {
    background-color: #f9f468;
    color: red;
  }
`;

const Results = () => {
  const navigate = useNavigate();
  const handleRetry = () => {
    navigate('/testpage'); // 절대 경로로 이동
  };
  const {
    data: userResult,
    isLoading,
    error
  } = useQuery({
    queryKey: ['results'],
    queryFn: async () => {
      // Supabase 세션 확인
      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      console.log('userResult => ', userResult);
      console.log('Session => ', session);
      console.log('Session Error => ', sessionError);

      if (sessionError || !session) {
        throw new Error('로그인 세션이 없습니다. 다시 로그인해주세요.');
      }

      const userId = session.user.id;
      console.log('session.user.id  => ', session.user.id);

      // Supabase에서 사용자 결과 가져오기
      const { data, error: fetchError } = await supabase
        .from('results')
        .select('mbtititle, description, besttag, badtag')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);

      console.log('Fetched data => ', data);
      console.log('Fetch Error => ', fetchError);

      if (fetchError) throw new Error(fetchError.message);
      if (data.length > 0) {
        return data[0]; // 데이터를 반환
      }
      return null;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <PageWrapper>
      <img src={daeeun_kong}></img>
      <img src={daeeun_kong}></img>
      <ResultContainer>
        {userResult ? (
          <>
            {/* 상단 이미지 */}
            <ImageRow position="top">
              <StyledImage src={star} alt="Star" />
              <StyledImage src={ball} alt="Ball" />
            </ImageRow>
            <Description>
              {userResult.mbtititle}
              <br />
              {userResult.description}
            </Description>{' '}
            {/* 설명 */}
            <TagContainer>
              <div>
                <TagLabelbest>같이 눈사람 만들 친구</TagLabelbest>
                <Besttag>{userResult.besttag}</Besttag> {/* 설명 */}
              </div>
              <TagLabelbad>연락 안 될 친구</TagLabelbad>
              <Badtag>{userResult.badtag}</Badtag> {/* 설명 */}
            </TagContainer>
            {/* 하단 이미지 */}
            <ImageRow position="bottom">
              <StyledImage1 src={snowman} alt="Snowman" />
              <StyledImage1 src={tree2} alt="Tree" />
              <StyledImage1 src={socks} alt="Socks" />
            </ImageRow>
          </>
        ) : (
          <p>No results found.</p>
        )}
        <Replay onClick={handleRetry}>다시해보기</Replay>
      </ResultContainer>
      <img src={daeeun_kong}></img>
      <img src={daeeun_kong}></img>
    </PageWrapper>
  );
};

export default Results;
