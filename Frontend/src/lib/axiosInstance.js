import axios from "axios";
const axioInstance = axios.create(
    {
        baseURL: "https://agent-distribution.onrender.com/api/v1",
        withCredentials: true
    }
)
export default axioInstance