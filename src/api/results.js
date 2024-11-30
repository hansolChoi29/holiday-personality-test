import { supabase } '../supabase/supabase.js';


export const saveTestResult = async ({ mbti, description }) => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User is not logged in.");

  const { data, error } = await supabase
    .from("results")
    .insert([{ mbti, description, user_id: userId }]);
  if (error) throw new Error(error.message);
  return data;
};
