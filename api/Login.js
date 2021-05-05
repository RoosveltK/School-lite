import axios from "axios";

const baseURL = "http://192.168.8.100:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
