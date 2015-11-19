`import Ember from 'ember'`
`import CPM from 'ember-cpm'`
`import Build from '../utils/build'`

{Macros} = CPM
{among} = Macros

{getWithDefault, String, Controller, RSVP, A, computed, get, isPresent} = Ember
{alias, equal, gt, and: present} = computed

calculateDelta = (e1, e2) ->
  dx: e2.snapGridX - e1.snapGridX
  dy: e2.snapGridY - e1.snapGridY

shiftBy = ({dx, dy}) ->
  (model) ->
    model.incrementProperty "x", dx
    model.incrementProperty "y", dy
    model.save()

TilesController = Controller.extend
  queryParams: ["mode", "type", "alt", "vi"]
  vi: "grid"
  mode: "query-mode"
  type: "road"
  alt: "query"
  tiles: alias "model.tiles"
  points: alias "model.points"
  lines: alias "model.lines"
  accMta: alias "currentUser.meta"
  requiresUpgrade: alias "accMta.requiresUpgrade"
  buildModeEngaged: equal "mode", "build-mode"
  typeLegal: present "ghost"
  busyCounter: 0

  ghost: computed "type",
    get: ->
      ghostType = switch @get "type"
        when "road", "wall" then "2point"
        when "dock", "station", "scale", "cell", "entrance", "exit", "desk" then "tile"
        when "camera" then "point"
      {ghostType}

  transitionMode: gt "busyCounter", 0

  enterTransitionMode: ->
    @incrementProperty "busyCounter", 1

  exitTransitionMode: ->
    @decrementProperty "busyCounter", 1

  makeTile: (tileCore) ->
    @enterTransitionMode()
    @store.createRecord "tile", tileCore
    .save()
    .then =>
      RSVP.hash
        tiles: @get("tiles").update()
        meta: @get("accMta").reload()
    .finally =>
      @exitTransitionMode()
  makeLine: (lineCore) ->
    @enterTransitionMode()
    @store.createRecord "line", lineCore
    .save()
    .then =>
      @get("lines").update()
    .finally =>
      @exitTransitionMode()
  handleQuery: (model) ->
    switch get model, "tileType"
      when "dock", "scale", "station", "cell", "entrance", "exit", "desk"
        @transitionToRoute "tiles.tile", model

  handleDelete: (model) ->
    @enterTransitionMode()
    model.destroyRecord()
    .finally =>
      @exitTransitionMode()

  buildCore: (e1, e2) ->
    switch @get "type"
      when "road"
        @makeLine Build.Road.from(e1).to(e2)          
      when "wall"
        @makeLine Build.Wall.from(e1).to(e2)
      when "dock"
        @makeTile Build.Dock.at(e1)
      when "entrance"
        @makeTile Build.Entrance.at(e1)
      when "exit"
        @makeTile Build.Exit.at(e1)
      when "cell"
        @makeTile Build.Cell.at(e1)
      when "scale"
        @makeTile Build.Scale.at(e1)
      when "desk"
        @makeTile Build.Desk.at(e1)
      else throw new Error "Oh Shit!"
  
  exceededPlanLimits: ->
    errors = @get "accMta.validationErrors"
    type = String.pluralize @getWithDefault("type", "apple")
    messages = get errors, type
    if isPresent messages
      message = A(messages).get("firstObject")
      @notify.alert "#{type} - #{message}"
      return true

  actions:
    obliterate: ->
      if @selectedModels?
        @enterTransitionMode()
        RSVP.all @selectedModels.map (model) -> model.destroyRecord()
        .finally =>
          @selectedModels = null
          @exitTransitionMode()

    query: (model) ->
      switch @get "alt"
        when "query"
          @handleQuery model
        when "delete"
          @handleDelete model
        else throw new Error "unknown alt"
    
    select: (models) ->
      @selectedModels = models
    build: (ghost, e1, e2) ->
      return @notify.alert("You need to select a tile") unless @get "typeLegal"
      @buildCore(e1, e2) unless @exceededPlanLimits()
      

`export default TilesController`