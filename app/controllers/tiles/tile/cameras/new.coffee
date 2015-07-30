`import Ember from 'ember'`
TilesTileCamerasNewController = Ember.Controller.extend
  actions:
    newCamera: ->
      @get "model"
      .save()
      .then (camera) =>
        @transitionToRoute "tiles.tile.cameras", camera.get("tileId")
    cancel: ->
      @transitionToRoute "tiles.tile.cameras", @get("model.tileId")

`export default TilesTileCamerasNewController`