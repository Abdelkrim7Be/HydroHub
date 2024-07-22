import axios from "axios";

// Creating an API
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;
