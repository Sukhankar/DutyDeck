import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", //import.meta.env.VITE_API_BASE_URL ||
});

export default API;