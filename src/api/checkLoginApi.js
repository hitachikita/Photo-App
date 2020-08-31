import axiosLogin from "./axiosLogin";

// api/productApi.js 
const checkLoginApi = {
    post: (params) => {
        const url = '/checklogin';
        console.log("Params in: ", params);
        return axiosLogin.post(url, {
            params,
        });
    }
}

export default checkLoginApi; 