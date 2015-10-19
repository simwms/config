`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  queryParams:
    userToken:
      refreshModel: true
    accountToken:
      refreshModel: true

  model: (params) ->
    @currentUser.smartLogin params

  afterModel: (model) ->
    if @currentUser.get("accountLoggedIn")
      @transitionTo "tiles"

`export default IndexRoute`