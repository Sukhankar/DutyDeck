import axios from "axios";

const API = axios.create({
  baseURL: "https://dutydeck-1.onrender.com/api",
});

export default API;
