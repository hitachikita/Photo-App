import axios from 'axios';
import queryString from 'query-string';


const axiosLogin = axios.create({
    baseURL: process.env.REACT_APP_API_USER,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

export default axiosLogin;