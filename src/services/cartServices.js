import Cookies from "js-cookie";
import request from "./baseService";

export const addToCart = async (item) => {
  try {
    const response = await request.put("/api/user/cart/add", item, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};
