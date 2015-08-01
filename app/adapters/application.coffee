`import DS from 'ember-data'`
`import ENV from 'apiv2/config/environment'`

ApplicationAdapter = DS.ActiveModelAdapter.extend
  namespace: ENV.namespace
  host: ENV.host

`export default ApplicationAdapter`
