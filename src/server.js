import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import mustacheExpress from 'mustache-express';
import routes from './_shared/routes/express-routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/_shared/layout');
app.use('/public', express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

// Log all requests to console if in Development
// Remove caching from all requests
if (process.env.ENV === 'development') {
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  });
}

// Register all routes for the application
routes(app);

// Start express application
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
  console.log(`Server environment: ${process.env.ENV}`);
});

// TODO:
// Add graceful shutdown
process.on('SIGINT', () => {
  console.log('Worker exiting');
  process.exit();
});

// Catch all un-caught postgres/db errors
process.stderr.on('data', (data) => {
  console.log('Database Error: ', data);
});
