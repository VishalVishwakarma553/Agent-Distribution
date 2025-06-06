import axios from "axios";
const axioInstance = axios.create({
  baseURL: "https://agent-distribution.onrender.com/api/v1", //http://localhost:4000/api/v1
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default axioInstance;
