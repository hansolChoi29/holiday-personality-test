import React, { useState } from 'react';
import TestForm from '../components/TestForm';
import { useNavigate } from 'react-router-dom';
import { useSaveUserResult } from '../api/users';
import { calculateMBTI, christmass } from '../utils/chistmassCalculator';

const TestPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const { mutate, isLoading, isError, error } = useSaveUserResult();

  const handleTestSubmit = (answers) => {
    const mbtiResult = calculateMBTI(answers);
    const description = `Your MBTI type is ${mbtiResult}.`;

    setResult(mbtiResult);

    //수파베이스에 결과를 저장
    mutate(
      { mbti: mbtiResult, description },//결과와 설명 전달
      {
        onSuccess: () => {
          alert('결과가 성공적으로 저장되었습니다!');
        },
        onError: (error) => {
          console.error('결과 저장 실패:', error.message);
          alert('결과 저장에 실패했습니다. 다시 시도해주세요.');
        }
      }
    );
  };

  const handleNavigateToResults = () => {
    navigate('/results');
  };

  return (
    <div>
      {!result ? (
        <>
          <h1>MBTI 테스트</h1>
          <TestForm onSubmit={handleTestSubmit} />
        </>
      ) : (
        <>
          <h1>테스트 결과: {result}</h1>
          <p>{christmass[result]}</p>
          <button onClick={handleNavigateToResults}>결과 목록으로 이동</button>
        </>
      )}
      {isLoading && <p>결과를 저장 중입니다...</p>}
      {isError && <p>오류 발생: {error.message}</p>}
    </div>
  );
};

export default TestPage;
