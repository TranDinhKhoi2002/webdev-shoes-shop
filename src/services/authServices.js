import request from "./baseService";

export const signup = async (account) => {
  const res = await request.post("/api/auth/signup", account);
  return res;
};

export const requestNewPassword = async (email) => {
  const res = await request.post("/api/auth/forgot-password", email);
  return res;
};

export const updatePassword = async (token, newPassword, confirmPassword) => {
  const res = await request.post(`/api/auth/reset-password/${token}`, {
    password: newPassword,
    confirmPassword: confirmPassword,
  });
  return res;
};
