import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import LinearRegression from '../pages/LinearRegression';
import SinglePointEstimation from '../pages/SinglePointEstimation';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/linear-regression" component={LinearRegression} />
        <Route exact path="/single-point-estimation" component={SinglePointEstimation} />
        <Route component={Error404}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
