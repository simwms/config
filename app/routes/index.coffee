`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  queryParams:
    token:
      refreshModel: true
    account:
      refreshModel: true

  model: (params) ->
    console.log params
    @currentUser.configure(params)
    @currentUser.setup(@store)

  afterModel: (model) ->
    if model.get("isLoggedIn")
      @transitionTo "tiles"

`export default IndexRoute`