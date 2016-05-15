const repl = require('repl');

// Load all files
//

const ENVIRONMENT = process.env.NODE_ENV || 'dev';

const replServer = repl.start({
  prompt: `Bike-${ENVIRONMENT} > `,
});

// replServer.context.whatever = whatever;
