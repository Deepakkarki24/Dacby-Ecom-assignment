import { VITE_API_URL } from "@/config/env";
import axios from "axios";

const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
