`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  queryParams:
    email:
      refreshModel: false
    password:
      refreshModel: false
    userToken:
      refreshModel: false
    accountToken:
      refreshModel: false

  model: (params) ->
    @currentUser.smartLogin params

  afterModel: (model) ->
    if @currentUser.get("accountLoggedIn")
      @transitionTo "tiles"

`export default IndexRoute`