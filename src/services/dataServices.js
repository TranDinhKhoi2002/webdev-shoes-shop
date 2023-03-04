import request from "./baseService";

export const getData = async () => {
  try {
    const response = await request.get("/api/data");
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};
