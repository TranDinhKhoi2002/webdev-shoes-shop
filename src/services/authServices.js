import Cookies from "js-cookie";
import request from "./baseService";

export const signup = async (account) => {
  try {
    const response = await request.post("/api/signup", account);
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const login = async (account) => {
  try {
    const response = await request.post("/api/login", account);
    console.log(response.data);
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const getUserProfile = async () => {
  try {
    const response = await request.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
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
