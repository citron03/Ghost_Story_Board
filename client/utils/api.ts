import axios from "axios";

const api = axios.create();
api.defaults.baseURL = "http://localhost:8080";

export default api;
