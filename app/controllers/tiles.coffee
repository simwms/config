`import Ember from 'ember'`
`import CPM from 'ember-cpm'`

TilesController = Ember.Controller.extend
  currentMode: "query"
  buildModeEngaged: Ember.computed.equal "currentMode", "build"
  buildTypeLegal: CPM.Macros.among "buildType", "road", "barn", "warehouse", "scale", "station"
  busyCounter: 0

  transitionMode: Ember.computed.gt "busyCounter", 0

  tellUserToSelectTile: ->
    alert "You forgot to select a tile type"

  enterTransitionMode: ->
    @incrementProperty "busyCounter"

  exitTransitionMode: ->
    @decrementProperty "busyCounter"

  handleMove: (tile) ->
    if Ember.isPresent @get "alreadyMovingBlank"
      @assignTilePosition tile, @get("alreadyMovingBlank")
      return @set "alreadyMovingBlank", null
    if Ember.isPresent @get "alreadyMovingTile"
      @swapTilePlaces tile, @get("alreadyMovingTile")
      @set "alreadyMovingTile", null
    else
      @set "alreadyMovingTile", tile

  handleBlank: (point) ->
    if Ember.isPresent @get "alreadyMovingTile"
      @assignTilePosition @get("alreadyMovingTile"), point
      return @set "alreadyMovingTile", null
    if Ember.isPresent @get "alreadyMovingBlank"
      @set "alreadyMovingBlank", null
    else
      @set "alreadyMovingBlank", point

  assignTilePosition: (tile, [x,y]) ->
    @enterTransitionMode()
    tile.set "x", x
    tile.set "y", y
    tile.save()
    .then => 
      @get("model").update()
    .finally =>
      @exitTransitionMode()

  swapTilePlaces: (tileA, tileB) ->
    pointA = [tileA.get("x"), tileA.get("y")]
    pointB = [tileB.get("x"), tileB.get("y")]
    @assignTilePosition tileA, pointB
    @assignTilePosition tileB, pointA

  buildTile: ([x,y]) ->
    return @tellUserToSelectTile() unless @get "buildTypeLegal"
    @enterTransitionMode()
    @store.createRecord "tile",
      tileType: @get "buildType"
      x: x
      y: y
    .save()
    .then =>
      @get("model").update()
    .finally =>
      @exitTransitionMode()

  tellOffUser: ({clientX, clientY}) ->
    Ember.$ "#busy-mouse-flash"
    .removeClass "hidden"
    .show()
    .attr "style", "top: #{clientY}px; left: #{clientX}px"
    .hide 1250

  actions:
    clickTile: (tile, event) ->
      return @tellOffUser(event) if @get "transitionMode"
      switch @get "currentMode"
        when "delete" then @send "destroyTile", tile
        when "move" then @handleMove tile
        else @transitionToRoute "tiles.tile.index", tile.get("id")

    clickBlank: (point, event) ->
      return @tellOffUser(event) if @get "transitionMode"
      switch @get "currentMode"
        when "build" then @buildTile point
        when "move" then @handleBlank point
        else alert "You clicked a blank tile, but no action is applicable right now"

    changeMode: (mode) ->
      @set "buildType", null
      return @set("currentMode", null) if @get("currentMode") is mode
      @set "currentMode", mode

    selectBuild: (type) ->
      return @set("buildType", null) if @get("buildType") is type
      @set "buildType", type

`export default TilesController`