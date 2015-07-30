`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  beforeModel: ->
    @transitionTo "tiles"

`export default IndexRoute`