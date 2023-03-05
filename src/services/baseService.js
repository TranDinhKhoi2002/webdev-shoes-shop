import axios from "axios";

const request = axios.create({
  baseURL: "https://shoesshop.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
