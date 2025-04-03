import axios from "axios";

export const API = axios.create({
  // baseURL: "https://qteenz-api.vercel.app/api",
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  () => Promise.reject()
);
