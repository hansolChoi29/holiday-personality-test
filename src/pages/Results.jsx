import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';

const Results = () => {
  const [userResult, setUserResult] = useState(null); // 사용자 결과 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const users = localStorage.getItem('users');
        if (!users) {
          throw new Error('User ID not found. ');
        }

        const { data: data, error: error } = await supabase
          .from('results')
          .select('mbti, description')
          .eq('id', users)
          .single(); // 사용자별 단일 결과 가져오기

        if (error) throw new Error(error.message);

        setUserResult(data); // 데이터 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div>Loading...</div>; // 로딩 화면
  if (error) return <div>Error: {error}</div>; // 에러 화면

  return (
    <div>
      <h1>Your Test Results</h1>
      {userResult ? (
        <div>
          <p>
            <strong>MBTI:</strong> {userResult.mbti}
          </p>
          <p>
            <strong>Description:</strong> {userResult.description}
          </p>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Results;
