import {create} from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),

  login: (token) => {
    localStorage.setItem("accessToken", token);
    set({ isLoggedIn: true, accessToken: token });
  },

  logout: () => {
    localStorage.removeItem("accessToekn");
    set({ isLoggedIn: false, accessToken: null});
  },

  }));