`import Ember from 'ember'`
`import CPM from 'ember-cpm'`

JustTile = Ember.Component.extend
  tagName: "g"
  classNameBindings: ["tileType"]
  attributeBindings: ["transform"]
  tile: Ember.computed.alias "model"
  x: CPM.Macros.product "parentView.pxPerWidth", "model.x"
  y: CPM.Macros.product "parentView.pxPerHeight", "model.y"

  width: CPM.Macros.product "parentView.pxPerWidth", "model.width"
  height: CPM.Macros.product "parentView.pxPerHeight", "model.height"

  tileType: Ember.computed.alias "tile.tileType"
  transform: CPM.Macros.fmt "x", "y", "translate(%@, %@)"
  rectX: CPM.Macros.quotient "width", -2
  rectY: CPM.Macros.quotient "height", -2
  cornerX: 10
  cornerY: 10
  strokeWidth: 2
  rectW: CPM.Macros.difference "width", 1
  rectH: CPM.Macros.difference "height", 1
  stroke: CPM.Macros.conditional "tile.hasCamera", "#b71c1c", "#212121"
  fill: Ember.computed "tileType", ->
    switch @get "tileType"
      when "barn" then "#ffcdd2" # red lighten-4
      when "road" then "#424242" # grey darken-4
      when "warehouse" then "#d7ccc8" # brown lighten-4
      when "station" then "#f0f4c3" # lime lighten-4
      when "scale" then "#b2ebf2" # cyan lighten-4
      else "#fff"
  iconText: Ember.computed "tileType", ->
    String.fromCharCode switch @get "tileType"
      when "barn" then 0xf239 # subway
      when "road" then 0xf018 # road
      when "warehouse" then 0xf1b3 # cubes
      when "station" then 0xf090 # sign-in
      when "scale" then 0xf1ec # calculator
      else "?"
  eventManager: Ember.Object.create
    click: (event, view) ->
      view.sendAction "action", view.get("model"), event

`export default JustTile`