import { create } from "zustand";


export const useAnswersStore = create((set) => ({
  // 초기 상태
  answers: [],

  // 상태 초기화
  initializeAnswers: (questions) => {
    set({
      answers: Array(questions.length).fill({ type: '', answer: '' })
    });
  },

  // 특정 질문에 대한 답변 업데이트
  updateAnswer: (index, type, answer) => {
    set((state) => {
      const updatedAnswers = [...state.answers];
      updatedAnswers[index] = { type, answer };
      return { answers: updatedAnswers };
    });
  }
}));
