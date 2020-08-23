import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Header from './components/header';
import Notfound from './components/notfound';

//Lazy load - Core Slitting
const Photo = React.lazy(() => import("./features/photo"));

function App() {
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
