`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  queryParams:
    token:
      refreshModel: true
    email:
      refreshModel: true

  model: (params) ->
    @currentUser.configure(params)
    @currentUser.setup(@store)

  afterModel: (model) ->
    if model.get("isLoggedIn")
      @transitionTo "tiles"

`export default IndexRoute`