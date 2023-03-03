import request from "./baseService";

export const getProductsByBrand = async (brandName) => {
  const res = await request.get(`/api/products?brandName=${brandName}`);
  return res.data.products;
};
