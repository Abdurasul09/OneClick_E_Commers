import axios from "axios"
export const baseUrl = "http://ca17-46-251-212-202.ngrok.io";
const Axios = axios.create({
    baseURL: baseUrl
});


Axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
    return config;
})

Axios.interceptors.response.use((config)=>{
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await Axios.post("token/refresh/", {
                refresh: localStorage.getItem("refresh", )
            }).then(() => {
                localStorage.setItem("access", response.data.access);
                localStorage.setItem("refresh", response.data.refresh);
            })

            return Axios.request(originalRequest);
        } catch (e) {
            console.log("not authorized")
        }

    }
    throw error;
});

export default Axios;
