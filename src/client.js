import React from 'react';
import ReactDOM from 'react-dom';
import reactRoutes from './_shared/routes/react-routes';
import { createHistory } from 'history';

const mountNode = document.getElementById('react-mount');
const routes = reactRoutes(createHistory());

ReactDOM.render(routes, mountNode);
