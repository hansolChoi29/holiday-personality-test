import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase/supabase.js';

// 사용자 정보 가져오기
export const useFetchUserInfo = () => {
  return useQuery(['userInfo'], async () => {
    const { data, error } = await supabase.from('users').select('id, nickname').single();

    if (error) throw new Error(error.message);

    const userId = data?.id;
    if (userId) {
      localStorage.setItem('userId', userId);
    }

    return data;
  });
};

// 결과 저장하기
export const useSaveUserResult = () => {
  return useMutation(async ({ userId, mbti, description, mbtititle, besttag, badtag }) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('로컬스토리지에서 사용자 ID를 찾을 수 없습니다.');
    }

    const { data, error } = await supabase
      .from('results')
      .insert([{ mbti, description, id: userId, mbtititle, besttag, badtag, created_at: new Date().toISOString() }]);

    if (error) throw new Error(error.message);

    return data;
  });
};
