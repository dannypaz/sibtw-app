import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { createLocation, createMemoryHistory } from 'history';
import reactRoutes from './react-routes';

const ENVIRONMENT = process.env.ENV || 'production';

function start(app) {
  app.use((req, res, next) => {
    const location = createLocation(req.path);
    const routes = reactRoutes(createMemoryHistory());
    const matchParams = {
      routes,
      location: location,
    };

    match(matchParams, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const html = ReactDOMServer.renderToStaticMarkup(
          <RoutingContext {...renderProps} />
        );
        res.render('index.html', {
          html: html,
          development: (ENVIRONMENT == 'development'),
          production: (ENVIRONMENT == 'production'),
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  });
};

export default start;
