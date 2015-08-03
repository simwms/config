`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend
  queryParams:
    token:
      refreshModel: true
    account:
      refreshModel: true

  model: ({token, account}) ->
    @currentUser.configure({token, account})
    @currentUser.setup(@store)

`export default ApplicationRoute`