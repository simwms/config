`import Ember from 'ember'`

TilesRoute = Ember.Route.extend
  beforeModel: ->
    unless @currentUser.get("isLoggedIn")
      @transitionTo "index"
  model: ->
    @store.find "tile"

  actions:
    destroyTile: (tile) ->
      tile
      .destroyRecord()
      .finally =>
        @refresh()

    closeModal: ->
      @transitionTo "tiles"

`export default TilesRoute`