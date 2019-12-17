const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require("express-session");
const KnexSessionStore = require("connect-session-knex")(sessions);

const knex = require("../database/dbConfig.js");

const sessionConfiguration = {
  // session storage options
  name: "user_login", // default would be sid
  secret: "keep it secret, keep it safe!", // used for encryption (must be an environment variable)
  saveUninitialized: true, // has implications with GDPR laws
  resave: false,

  // how to store the sessions
  store: new KnexSessionStore({
    // DO NOT FORGET THE new KEYWORD
    knex, // imported from dbConfig.js
    createtable: true,
    clearInterval: 600000, // defaults to 6000
    sidfieldname: "sid",

    // optional
    tablename: "sessions",
  }),

  // cookie options
  cookie: {
    maxAge: 600000, // session will be good for 10 mins in milliseconds
    secure: false, // if false the cookie es sent over http, if true only sent over https
    httpOnly: true // if true JS cannot access the cookie
  }
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(sessions(sessionConfiguration));
};
