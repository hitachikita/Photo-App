import productApi from 'api/productApi';
import Signin from 'features/auth/pages/signin';
import firebase from 'firebase';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/header';
import Notfound from './components/notfound';
import { getMe } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import './components/FontAwesomeIcon';

//Lazy load - Core Slitting
const Photo = React.lazy(() => import("./features/photo"));

function App() {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);

  // Configure Firebase.
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    // ...
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }

  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     try {
  //       const params = {
  //         _page: 1,
  //         _limit: 10,
  //       };
  //       const response = await productApi.getAll(params);
  //       console.log(response);
  //       setProductList(response.data);
  //     } catch (error) {
  //       console.log("Fail to fetch product list: ", error);
  //     }
  //   }

  //   fetchProductList();
  // }, []);


  // handle firebase auth changed

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // user is logout
        console.log("User is not loggin!");
        return;
      }

      // Get me when signed in
      // const action = getMe();
      try {
        const actionResult = await dispatch(getMe());
        const currentUser = unwrapResult(actionResult);
        //console.log("Logged in user: ", currentUser);
      } catch (error) {
        console.log("Failed to login: ", error.message);
        // show toast error
      }

      //   console.log("Logged in user: ", user.displayName);
      // const token = await user.getIdToken();
      // console.log("Logged in user with token: ", token);
    }
    );

    return () => unregisterAuthObserver();
  }, []);


  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          {/* <Header /> */}

          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={Signin} />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
