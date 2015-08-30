`import Ember from 'ember'`
`import DS from 'ember-data'`
`import ENV from 'config/config/environment'`

volatile = ->
  Ember.computed(arguments...).volatile()

ApplicationAdapter = DS.ActiveModelAdapter.extend
  namespace: ENV.namespace
  host: ENV.host
  headers: volatile "currentUser.simwmsAccountSession", ->
    "simwms-account-session": @get("currentUser.simwmsAccountSession")
`export default ApplicationAdapter`
