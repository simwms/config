`import DS from 'ember-data'`
`import ENV from 'config/config/environment'`

ApplicationAdapter = DS.ActiveModelAdapter.extend
  namespace: ENV.namespace
  host: ENV.host

`export default ApplicationAdapter`
