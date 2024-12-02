import React, { useState } from 'react';
import styled from 'styled-components';
import TestForm from '../components/TestForm';
import { useNavigate } from 'react-router-dom';
import { calculateMBTI, christmass } from '../utils/chistmassCalculator';

// 스타일드 컴포넌트 정의
const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  height: auto;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 24px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

const TestPage = ({ user }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);

    try {
      // API를 통해 결과 저장
      await createTestResult({
        userId: user.id,
        mbti: mbtiResult,
        description: mbtiDescriptions[mbtiResult] || '설명이 없습니다.'
      });

      // 결과를 상태에 저장
      setResult(mbtiResult);
    } catch (error) {
      console.error('결과 저장 실패:', error);
      alert('결과 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleNavigateToResults = () => {
    navigate('/results');
  };

  return (
    <PageContainer>
      <ContentContainer>
        {!result ? (
          <>
            <Title>MBTI 테스트</Title>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <Title>테스트 결과: {result}</Title>
            <Description>{christmass[result] || '해당 성격 유형에 대한 설명이 없습니다.'}</Description>
            <Button onClick={handleNavigateToResults}>결과 페이지로 이동하기</Button>
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default TestPage;
