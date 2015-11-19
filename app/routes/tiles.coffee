`import Ember from 'ember'`

{Route, RSVP, computed} = Ember
{Promise} = RSVP

TilesRoute = Route.extend
  beforeModel: ->
    unless @currentUser.get("accountLoggedIn")
      @transitionTo "index"
  model: ->
    RSVP.hash
      lines: @store.find "line"
      points: @store.find "point"
      tiles: @store.find "tile"

  tearDown: Ember.on "deactivate", ->
    @controller.selectedModels = null
    @controller.set "busyCounter", 0

  actions:
    closeModal: ->
      @transitionTo "tiles"

`export default TilesRoute`