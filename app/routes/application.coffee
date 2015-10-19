`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend
  model: ->
    @currentUser.smartLogin({})

`export default ApplicationRoute`