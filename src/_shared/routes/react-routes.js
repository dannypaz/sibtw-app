import React from 'react';
import { Route, Router } from 'react-router';
import DefaultLayout from '../../_shared/layout/layout';

export default function(history) {
  return (
    <Router history={history}>
      <Route path='/' component={DefaultLayout}>
      </Route>
    </Router>
  );
};
