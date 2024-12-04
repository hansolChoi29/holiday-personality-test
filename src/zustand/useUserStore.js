// 로그인한 유저를 저장하면 
// 메인 페이지, 마이페이지, 결과페이지, 테스트 페이지 등에서 
// 다 유저정보를 쓸 수 있다.

import { create } from "zustand";

export const useUserStore = create((set) => ({
	user: null,
	login: (userData) => {
		set({ user: userData })
	},
	logout: () => {
		set({ user: null })
	}
}))

