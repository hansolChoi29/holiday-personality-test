import { create } from 'zustand';

export const useUserStore = create((set) => ({
  // user의 초기값
  user: null,
  // user를 바꾸는 함수
  // 1. 로그인
  login: (userData) => {
    set({ user: userData });
  },
  // 2. 로그아웃: 유저 정보를 null로 다시 되돌린다.
  logout: () => {
    set({ user: null });
  }
}));
