`import Ember from 'ember'`
`import DS from 'ember-data'`
`import ENV from 'config/config/environment'`

volatile = ->
  Ember.computed(arguments...).volatile()

AccountAdapter = DS.ActiveModelAdapter.extend
  host: ENV.simwmsHost
  namespace: ENV.simwmsNamespace
  headers: volatile "currentUser.rememberToken", ->
    "remember_token": @get("currentUser.rememberToken")

`export default AccountAdapter`