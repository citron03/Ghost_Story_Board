import axios from "axios";

const api = axios.create();
// api.defaults.baseURL = "http://127.0.0.1:8080";
api.defaults.baseURL = "https://ghost-rabbit.shop";

export default api;
