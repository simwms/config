`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend
  model: ->
    unless @currentUser.get("isLoggedIn")
      @currentUser.setup(@store)

`export default ApplicationRoute`