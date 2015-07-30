`import Ember from 'ember'`
TilesCameraIndexController = Ember.Controller.extend
  actions:
    destroy: ->
      if @get "destroyModeEngaged"
        model =  @get "model"
        tileId = model.get "tileId"
        @toggleProperty "destroyModeEngaged"
        model
        .destroyRecord()
        .then => @transitionToRoute "tiles.tile.camera", tileId
      else
        @toggleProperty "destroyModeEngaged"
      return
    undestroy: ->
      @set "destroyModeEngaged", false

    cancel: ->
      @transitionToRoute "tiles.tile.cameras", @get("model.tileId")
    editCamera: ->
      @get "model"
      .save()
      .then (camera) =>
        @transitionToRoute "tiles.tile.cameras", @get("model.tileId")
      .catch (error) ->
        window.error = error
        console.log error
`export default TilesCameraIndexController`