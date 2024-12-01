import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';

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
          throw new Error('User is not logged in. Please log in again.');
        }

        const session = JSON.parse(sessionData);
        const userId = session.user.id; // 로그인된 사용자 ID 가져오기

        // Supabase에서 사용자 결과 가져오기
        const { data, error } = await supabase.from('results').select('mbti, description').eq('id', userId).single();

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
    <div>
      {userResult ? (
        <div>
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
