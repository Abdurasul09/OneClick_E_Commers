import axios from "axios";

const api = axios.create({
    baseURL: "https://f1d8-92-62-66-21.ngrok.io/",
});
export default api;