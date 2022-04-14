import axios from "axios";

const api = axios.create({
    baseURL: "http://39ec-46-251-221-21.ngrok.io/"
});
export default api;