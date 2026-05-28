import api from "./api";

// 회원가입
export const signup = async (userData) => {
  const response = await api.post("/accounts/signup/", userData);

  return response.data;
};

// 로그인
export const loginApi = async (loginData) => {
  const response = await api.post("/accounts/login/",loginData);

  return response.data;
};
