import Cookies from "js-cookie";
import request from "./baseService";

export const getData = async () => {
  try {
    const response = await request.get("/api/data");
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const getUserHistory = async () => {
  try {
    const response = await request.get("/api/receipts", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};
