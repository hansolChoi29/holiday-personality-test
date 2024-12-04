import React, { useState } from 'react';
import styled from 'styled-components';
import TestForm from '../components/TestForm';
import { useNavigate } from 'react-router-dom';
import { calculateMBTI, christmass } from '../utils/chistmassCalculator';
import { supabase } from '../supabase/supabase';
// 스타일드 컴포넌트 정의
const PageWrapper = styled.div`
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
  background-image: url('http://localhost:5173/background1.png');
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 100vh;
`;
const ContentContainer = styled.div`
  width: 400px;
  height: 600px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  border: 15px solid #d84137;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
  color: black;
`;
const Gifimg = styled.img`
  position: absolute;
  width: 140px;
  height: 140px;
  z-index: 10;
  top: 450px;
  right: 250px;
`;
const Gifimg1 = styled.img`
  position: absolute;
  width: 140px;
  height: 140px;
  z-index: 10;
  top: 450px;
  right: 50px;
`;

const TestPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    try {
      // 현재 로그인된 사용자 세션 확인
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session || !session.session?.user) {
        alert('로그인이 필요합니다.');
        navigate('/'); // 로그인 페이지로 이동
        return;
      }

      const user = session.session.user;
      console.log('User:', user);

      // Supabase에서 사용자 결과가 이미 존재하는지 확인
      const { data: existingResult, error: fetchError } = await supabase
        .from('results')
        .select('*')
        .eq('user_id', user.id)
        .single(); // 단일 결과만 반환
      if (fetchError && fetchError.code !== 'PGRST116') {
        // "PGRST116"은 데이터가 없을 때의 코드
        console.error('결과 확인 실패:', fetchError.message);
        alert('결과 확인에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      // 저장할 데이터
      const saveData = {
        user_id: user.id,
        mbti: mbtiResult,
        description: christmass[mbtiResult]?.description || '설명이 없습니다.',
        mbtititle: christmass[mbtiResult]?.mbtititle || `${mbtiResult}`,
        besttag: christmass[mbtiResult]?.besttag || 'besttag',
        badtag: christmass[mbtiResult]?.badtag || 'badtag',
        created_at: new Date().toISOString()
      };

      if (existingResult) {
        // 기존 결과가 있을 경우 UPDATE
        const { error: updateError } = await supabase.from('results').update(saveData).eq('user_id', user.id);
        if (updateError) {
          console.error('결과 업데이트 실패:', updateError.message);
          alert('결과 업데이트에 실패했습니다.');
          return;
        }
        console.log('결과 업데이트 성공');
      } else {
        // 기존 결과가 없을 경우 INSERT
        const { error: insertError } = await supabase.from('results').insert([saveData]);
        if (insertError) {
          console.error('결과 저장 실패:', insertError.message);
          alert('결과 저장에 실패했습니다.');
          return;
        }
        console.log('결과 저장 성공');
      }

      // 결과 페이지로 이동
      navigate('/results', { state: { result: mbtiResult } });
    } catch (error) {
      console.error('결과 처리 실패:', error.message);
      alert('결과 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <PageWrapper>
      <PageContainer>
        <ContentContainer>
          <Title>☃크리스마스 성격 테스트☃</Title>
          <TestForm onSubmit={handleTestSubmit} />
          <Gifimg src="http://localhost:5173/daeeun_kong.gif" alt="대은콩"></Gifimg>
          <Gifimg1 src="http://localhost:5173/daeeun_kong.gif" alt="대은콩"></Gifimg1>
        </ContentContainer>
      </PageContainer>
    </PageWrapper>
  );
};
export default TestPage;
