// this file is to allow transpile of front end syntax for importing modules
// Preventing erros when SSR for SEO

require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// Import app.
module.exports = require('./server.js')
