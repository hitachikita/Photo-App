// import axiosClient from './axiosClient';
import axios from 'axios';

const userApi = {
    postAll: (params) => {
        // TOTD: call API to get current user
        const url = process.env.REACT_APP_API_USER;

        return new Promise((resolve, reject) => {
            const data = axios.post(url, params)
                .then(res => {
                    console.log("Data: ", res.data);
                    console.log("Data id: ", res.data.data.id);

                    setTimeout(() => {
                        resolve({
                            correct: res.data.correct,
                            id: res.data.data.id,
                            email: res.data.data.email,
                            password: res.data.data.password,
                            status: res.data.data.status,
                        })
                    }, 500);
                })
                .catch(err => console.log("Error: ", err));
        })
    },
}

export default userApi;