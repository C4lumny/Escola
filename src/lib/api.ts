import axios from "axios";

export const escolaApi = axios.create({
  baseURL: "https://sadieapi.onrender.com/",
  // baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  },
});