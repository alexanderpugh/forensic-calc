import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import LinearRegression from '../pages/LinearRegression';
import SinglePointEstimation from '../pages/SinglePointEstimation';
import HeatOfExplosion from '../pages/HeatOfExplosion';
import ExplosivePower from '../pages/ExplosivePower';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/linear-regression" component={LinearRegression} />
        <Route exact path="/single-point-estimation" component={SinglePointEstimation} />
        <Route exact path="/heat-of-explosion" component={HeatOfExplosion} />
        <Route exact path="/explosive-power" component={ExplosivePower} />
        <Route component={Error404}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
