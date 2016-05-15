// TODO
// Needs to be renamed to fit pagerduty/whatever logging utility
// we will use for this application

import EventEmitter from './event-emitter';

function logging() {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('application-error', function (msg, options) {
    if (msg && options)
      console.log(`An error occured: ${msg} with options: ${options}`);
  });

  eventEmitter.on('connection-error', function (msg, options) {
    if (msg && options)
      console.log(`An error occured: ${msg} with options: ${options}`);
  });
};

export default logging;
