`import Ember from 'ember'`
`import DS from 'ember-data'`

alias = Ember.computed.alias

ApplicationAdapter = DS.ActiveModelAdapter.extend
  namespace: alias "currentUser.namespace"
  host: alias "currentUser.host"

`export default ApplicationAdapter`
