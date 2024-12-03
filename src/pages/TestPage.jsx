import React, { useState } from 'react';
import styled from 'styled-components';
import TestForm from '../components/TestForm';
import { useNavigate } from 'react-router-dom';
import { calculateMBTI, christmass } from '../utils/chistmassCalculator';
import { supabase } from '../supabase/supabase';

// 스타일드 컴포넌트 정의
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 100vh;
  background-color: #f0f8ff; /* 밝은 배경색 */
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
`;

const TestPage = () => {
  const navigate = useNavigate();

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    try {
      // 현재 로그인된 사용자 세션 확인
      const { data: session, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        alert('로그인이 필요합니다.');
        navigate('/'); // 로그인 페이지로 이동
        return;
      }

      const user = session.session.user;

      // Supabase API를 사용해 결과 저장
      const { data, error } = await supabase.from('results').insert([
        {
          user_id: user.id,
          mbti: mbtiResult,
          description: christmass[mbtiResult]?.description || '설명이 없습니다.',
          mbtititle: christmass[mbtiResult]?.mbtititle || `${mbtiResult}`,
          besttag: christmass[mbtiResult]?.besttag || 'besttag',
          badtag: christmass[mbtiResult]?.badtag || 'badtag',
          created_at: new Date().toISOString()
        }
      ]);

      if (error) {
        throw new Error(error.message);
      }

      // 결과 페이지로 이동
      navigate('/results', { state: { result: mbtiResult } });
    } catch (error) {
      console.error('결과 저장 실패:', error);
      alert('결과 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Title>⛄ 크리스마스 성격 테스트 ⛄</Title>
        <TestForm onSubmit={handleTestSubmit} />
      </ContentContainer>
    </PageContainer>
  );
};

export default TestPage;
