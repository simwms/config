`import Ember from 'ember'`

{Route, RSVP, computed} = Ember
{Promise} = RSVP

TilesRoute = Route.extend
  queryParams:
    mode:
      refreshModel: false
    type:
      refreshModel: false

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
    destroyTile: (tile) ->
      tile
      .destroyRecord()
      .finally =>
        @refresh()

    closeModal: ->
      @transitionTo "tiles"

`export default TilesRoute`