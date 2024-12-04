import { create } from 'zustand';

const useStore = create((set) => ({
  formStates: {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: ''
  },
  formErrors: {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: ''
  },
  setFormStates: (newStates) =>
    set((state) => ({
      formStates: { ...state.formStates, ...newStates }
    })),
  setFormErrors: (newErrors) =>
    set((state) => ({
      formErrors: { ...state.formErrors, ...newErrors }
    })),
  resetForm: () =>
    set(() => ({
      formStates: {
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: ''
      },
      formErrors: {
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: ''
      }
    }))
}));

export default useStore;
