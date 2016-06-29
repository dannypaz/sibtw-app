# SIBTW-app (shouldibiketowork)
Your commute decision-er. A magic 8-ball for bike commuters in the City of Chicago.

## Description
This is the web application that drives data for `shouldibiketowork.com`.

## Before you begin

We recommend that you install the following:

1. Node Version Manager
  - [NVM](https://github.com/creationix/nvm)
  - We currently use the latest Node @ 6.x.x
2. Postgres
  - Install via Homebrew `brew install postgres`

## Getting started

In order to run the project you will need to complete the following steps:

1. create a `.env` file with appropriate keys
2. create a db for your project

#### Creating an ENV file

You will need to add the following ENV variables into a `.env` file at the root
of the project.

```
  ENV=<production or development>
  PORT=<port-for-express-http>
  DATABASE_URL=<your-pg-database-url>
```

The default port that the http server will run on is `3000`.

#### Creating a DB

By default, the project will use a DB called `sibtw-app` which needs to be available
via localhost. However, you can specify your own database using the `DATABASE_URL`
environment variable.

Use the following command to create the default db in your postgres instance: `createdb sibtw-app`

**NOTE:** The database is probably setup from other applications. Use these commands at your own discretion.

## Commands
Here is a list and description of commands that you can use to edit, develop, and
administer the sibtw-app project.

```
  // This will start the application via PM2.
  // Please view package.json for more info (we use a few v8 flags)
  npm start

  // Start the development environent for the application.
  npm run dev

  // Start an interactive shell inside of the application. Configuration can be
  // found in `repl.js`
  npm run console

  // View all server logs for the application (grabs logs from PM2)
  npm run logs

  // Self explanatory. Runs migrations which are located in the `migrations/` directory
  npm run db-migrate

  // Run all tests for the application
  npm test

  // Self explanatory. Runs migrations which are located in the `migrations/` directory
  npm run db-migrate

  // Seeds the db with fake initial records. This command is entirely optional
  // and is not REQUIRED to run the project successfully. You can find sample data
  // inside of `seed/dev.js`
  npm run seed
```

#### Generate Documentation

All files currently use [jsdoc](https://github.com/jsdoc3/jsdoc) comments for documentation.

To generate documentation, use the following command: `npm run jsdoc`

To run the documentation server, use `npm run doc-server` and navigate to [localhost:9000](http://localhost:9000)
