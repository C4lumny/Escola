import axios from "axios";

export const escolaApi = axios.create({
  // baseURL: "https://sadieapi.onrender.com/",
  baseURL: "http://localhost:3000/",  
  headers: {
    "Content-Type": "application/json",
  },
});