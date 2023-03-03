import request from "./baseService";

export const signup = async (account) => {
  const res = await request.post("/api/signup", account);
  return res;
};

export const login = async (account) => {
  const res = await request.post("/api/login", account);
  return res;
};

export const requestNewPassword = async (email) => {
  const res = await request.post("/api/forgot-password", email);
  return res;
};

export const updatePassword = async (token, newPassword, confirmPassword) => {
  const res = await request.post(`/api/reset-password/${token}`, {
    password: newPassword,
    confirmPassword: confirmPassword,
  });
  return res;
};
