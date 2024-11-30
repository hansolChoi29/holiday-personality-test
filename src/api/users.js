import { supabase } from "../supabase/supabase";

// supabase import

//결과저장
export const saveUserResult = async ({ mbti, description, userId }) => {
  const { data, error } = await supabase
    .from("results")
    .insert([{ mbti, description, user_id: userId }]);
  if (error) throw new Error(error.message);
  return data;
};

// src/services/api/users.js

// 사용자 정보 가져오기
export const fetchUserInfo = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  const userId = data?.user?.id;
  if (userId) {
    localStorage.setItem("userId", userId); // userId를 localStorage에 저장
  }

  return data;
};
