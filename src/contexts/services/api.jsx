import axios from "axios";

// const REST_API_URL_BASE = "http://localhost:8080/";
const REST_API_URL_BASE = "https://aa29372958ba.ngrok-free.app/";

const API = axios.create({
  baseURL: REST_API_URL_BASE,
}); 

API.defaults.headers.common["Content-Type"] = "application/json";


export default API