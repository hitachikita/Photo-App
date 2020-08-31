import axiosClient from "./axiosClient";

// api/productApi.js 
const productApi = {
    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, {
            params,
            // baseURL: "abc",
            // headers: {
            //     "testing": "def"
            // }
        });
    },
    get: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
}

export default productApi; 