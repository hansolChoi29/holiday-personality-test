import React, { useState } from 'react';
import TestForm from '../components/TestForm';
import { useNavigate } from 'react-router-dom';
import { useSaveUserResult } from '../api/users';


const TestPage = ({ user }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  // Supabase에 결과 저장 훅 사용
  const { mutate, isLoading, isError, error } = useSaveUserResult();

  const handleTestSubmit = (answers) => {
    const mbtiResult = calculateMBTI(answers); // 사용자가 선택한 답변으로 MBTI 계산

    setResult(mbtiResult); // 결과를 상태에 저장

    // Supabase에 결과 저장
    mutate(
      {
        userId: user.id, // 사용자의 ID
        mbti: mbtiResult, // MBTI 결과
        description: `당신의 MBTI는 ${mbtiResult}입니다.`, // 설명
        mbtititle: `${mbtiResult}의 특징`, // 특징 제목
        besttag: '긍정적인 태그', // 예: "이타적, 열정적"
        badtag: '부정적인 태그' // 예: "충동적, 예민함"
      },
      {
        onSuccess: () => {
          alert('결과가 성공적으로 저장되었습니다!');
        },
        onError: (err) => {
          console.error('결과 저장 실패:', err.message);
          alert('결과 저장에 실패했습니다. 다시 시도해주세요.');
        }
      }
    );
  };

  const handleNavigateToResults = () => {
    navigate('/results'); // 결과 목록 페이지로 이동
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
          <p>당신의 MBTI 설명: {result}</p>
          <button onClick={handleNavigateToResults}>결과 목록으로 이동</button>
        </>
      )}
      {isLoading && <p>결과를 저장 중입니다...</p>}
      {isError && <p>오류 발생: {error?.message}</p>}
    </div>
  );
};

export default TestPage;
