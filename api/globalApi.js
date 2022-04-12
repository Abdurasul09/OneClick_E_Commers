import axios from "axios";

const api = axios.create({
    baseURL: "http://ca17-46-251-212-202.ngrok.io",
});
export default api;