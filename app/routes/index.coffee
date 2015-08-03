`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  model: (params) ->
    @modelFor "application"

  afterModel: (model) ->
    if model.get("isLoggedIn")
      @transitionTo "tiles"

`export default IndexRoute`