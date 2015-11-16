`import Ember from 'ember'`
TilesTileIndexController = Ember.Controller.extend
  actions:
    destroy: ->
      if @get "destroyModeEngaged"
        @get "model"
        .destroyRecord()
        .finally =>
          @transitionToRoute "tiles"
      @toggleProperty "destroyModeEngaged"
      return
    undestroy: ->
      @set "destroyModeEngaged", false
    cancel: ->
      @transitionToRoute "tiles"
    editTile: ->
      @get "model"
      .save()
      .then (tile) => @transitionToRoute "tiles"
      .catch (error) ->
        alert "Something went wrong, check the console"
        console.log error

`export default TilesTileIndexController`