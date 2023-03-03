import request from "./baseRequest";

export const signup = async (account) => {
  const res = await request.post("/api/auth/signup", account);
  return res;
};
