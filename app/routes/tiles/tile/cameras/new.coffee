`import Ember from 'ember'`

TilesTileCamerasNewRoute = Ember.Route.extend
  model: ->
    tile = @modelFor "tiles.tile"
    @store.createRecord "camera", tileId: tile.get("id")

  tearDown: Ember.on "deactivate", ->
    model = @controller.get "model"
    model.deleteRecord() if Ember.get(model, "isDirty")

`export default TilesTileCamerasNewRoute`