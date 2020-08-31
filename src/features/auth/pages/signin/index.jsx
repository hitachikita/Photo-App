import axios from 'axios';
import Images from 'constants/images';
import SigninForm from 'features/auth/components/signinform';
import firebase from 'firebase';
import queryString from 'query-string';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './signin.scss';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import { FormFeedback } from 'reactstrap';
import { useState } from 'react';
import HeaderLogged from 'components/header/logged';
import { useDispatch } from 'react-redux';
import { getMe } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

Signin.propTypes = {};

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/photos',
    // callbacks: {
    //     // Avoid redirects after sign-in.
    //     signInSuccessWithAuthResult: () => false
    // }
};

function Signin(props) {
    const [isCorrect, setIsCorrect] = useState('');
    const [connect, SetConnect] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        // values.preventDefault();
        const params = {
            email: values.username,
            password: values.password,
        };

        const fetchUserApi = async () => {
            try {
                // const response = userApi.postAll(params);
                // console.log("Return API: ", response);

                const action = getMe(params);
                const actionResult = await dispatch(action);
                const currentUser = unwrapResult(actionResult);
                console.log("Logged in user: ", actionResult, currentUser);


                if (currentUser.correct == true) {
                    setIsCorrect('');
                    history.push('/photos');
                } else {
                    setIsCorrect('is-invalid');
                }

            } catch (error) {
                console.log("Fecth Api errors: ", error);
                SetConnect("is-invalid");
            }
        }

        fetchUserApi();

        // console.log("Log cais nayf ra: ", { params });
        // // const url = process.env.REACT_APP_API_USER;
        // // const url = '/checklogin';
        // // const params2 = queryString.stringify(params);
        // setTimeout(() => {
        //     axios.post("http://localhost:5000/checklogin", params)
        //         .then(res => {
        //             console.log("Res: ", res);
        //             console.log("Res data: ", res.data);
        //             console.log("Res data ID: ", res.data.id);

        //             if (res.data.correct == true) {
        //                 setIsCorrect('');
        //                 history.push('/photos');
        //             } else {
        //                 setIsCorrect('is-invalid');
        //                 console.log("Corr..: ", isCorrect);
        //                 //alert("Username or password incorrect !");
        //             }
        //         }).catch(err => {
        //             console.log("Connect to server error: ", err);
        //             SetConnect("is-invalid");
        //         })
        // }, 1000);
    };
    return (
        <div>
            <HeaderLogged />
            <img src={Images._BG} alt="" className="background" />
            <div className='sign-in'>
                <div className="img">
                    <p>Đăng nhập để tạo Album, lưu trữ hình ảnh và chia sẽ hình ảnh lên trang cá nhân của bạn.</p>
                    <img src={Images.LOGIN} />
                </div>
                <div className="text-center">
                    <h2 className='title'>Welcom to photo-app!</h2>

                    <div className='sign-in__form'>
                        <SigninForm
                            onSubmit={handleSubmit}
                        />
                        <div className={isCorrect} />
                        <FormFeedback>Username or password is incorrect!</FormFeedback>
                        <div className={connect} />
                        <FormFeedback>Could not connect to the server, please check the network connection!</FormFeedback>
                    </div>
                    <div className='sign-in__with-account'>
                        {/* <p>or login with accounts</p> */}
                        <StyledFirebaseAuth className='others'
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;