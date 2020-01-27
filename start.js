// this file is to allow transpile of front end syntax for importing modules
// Preventing erros when SSR for SEO

require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
      [
        "css-modules-transform",
          {
              camelCase: true,
              extensions: [ ".css"],
          }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose" : true
        }
      ],
      [
      "transform-assets",
        {
          "extensions": ["svg", "png", "jpg", "jpeg"]
        }
      ],
      "dynamic-import-node",
  ]
});

// Import app.
module.exports = require('./server.js')
