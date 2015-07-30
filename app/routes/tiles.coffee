`import Ember from 'ember'`

TilesRoute = Ember.Route.extend
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