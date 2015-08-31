/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'config',
    environment: environment,
    contentSecurityPolicy: { 
      'connect-src': "'self' https://*.herokuapp.com",
      "img-src": "*",
      "media-src": "'self' http://localhost:*",
      "font-src": "*",
      "style-src": "* 'unsafe-inline'",
      "script-src": "'self' https://s.ytimg.com",
      "frame-src": "*"
    },
    baseURL: '/',
    locationType: 'auto',
    namespace: "apiv3",
    simwmsHomePage: "https://simwms.github.io",
    simwmsHelpPage: "https://simwms.github.io/#/o/help",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === "staging") {
    ENV.baseURL = "/config";
    ENV.locationType = "hash";
    ENV.host = "https://evening-springs-7575.herokuapp.com";
  }

  if (environment === 'production') {
    ENV.baseURL = "/config";
    ENV.locationType = "hash";
    ENV.host = "https://evening-springs-7575.herokuapp.com";
  }

  return ENV;
};
