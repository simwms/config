proxyPath = '/apiv2'
proxy = require('http-proxy').createProxyServer({})

proxy.on 'error', (err, req) ->
  console.error(err, req.url)

module.exports = (app) ->
  app.use proxyPath, (req, res, next) ->
    req.url = proxyPath + '/' + req.url
    proxy.web req, res, target: 'http://localhost:4000'