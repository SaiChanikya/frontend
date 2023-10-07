import React from 'react';
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import "antd/dist/antd.variable.min.css";
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import StateDetails from './Components/StateDetails';
import Profile from './Components/Profile';
import States from './Components/States';
import Hotels from './Components/Hotels';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/sign-up" exact component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/states/:stateId" component={StateDetails} />
      <Route path="/city/:cityId/hotels" component={Hotels} />
      <Route path="/states" component={States} />
    </Switch>
  );
}

export default App;
