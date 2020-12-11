import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequiresAuthStatus from "./HOC/RequiresAuthStatus";
import Header from "./components/Header";
import { Status } from "./types/Base";

const RouterApp = () => (
  <BrowserRouter>
    <Header />
    <div className="container content">
      <Switch>
        <RequiresAuthStatus path='/' exact={true} component={Dashboard} redirectUrl="/login" onlyStatus={Status.Success} />
        <RequiresAuthStatus path='/login' exact={true} component={Login} redirectUrl="/" notStatus={Status.Success} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default RouterApp;
