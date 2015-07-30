`import Ember from 'ember'`
TilesTileCamerasController = Ember.Controller.extend
  actions:
    newCamera: ->
      @transitionToRoute "tiles.tile.cameras.new", @get("model.id")
    showCamera: (camera) ->
      @transitionToRoute "tiles.camera", camera.get("id")

`export default TilesTileCamerasController`