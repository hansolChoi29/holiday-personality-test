import { supabase } from "../supabase/supabase";

export const saveTestResult = async ({ mbti, description }) => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("사용자가 로그인되지 않았습니다.");

  const { data, error } = await supabase
    .from("results")
    .insert([{ mbti, description, user_id: userId }]);
  if (error) throw new Error(error.message);
  return data;
};
