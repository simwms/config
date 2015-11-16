`import Ember from 'ember'`
`import DS from 'ember-data'`
`import ENV from 'config/config/environment'`
`import {SimwmsHeaders} from 'simwms-shared'`
volatile = ->
  Ember.computed(arguments...).volatile()

ApplicationAdapter = DS.ActiveModelAdapter.extend SimwmsHeaders,
  namespace: ENV.apiaNamespace
  host: ENV.host

`export default ApplicationAdapter`
