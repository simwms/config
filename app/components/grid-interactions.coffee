`import Ember from 'ember'`
`import CPM from 'ember-cpm'`

product = (xs, ys) ->
  output = []
  for x in xs
    for y in ys
      output.push [x,y]
  output

faicon = (type) ->
  String.fromCharCode switch type
    when "barn" then 0xf239 # subway
    when "road" then 0xf018 # road
    when "warehouse" then 0xf1b3 # cubes
    when "station" then 0xf090 # sign-in
    when "scale" then 0xf1ec # calculator
    else 0xf0a7 # hand-o-down

GridInteractions = Ember.Component.extend
  tagName: "g"
  classNames: ["interactions"]
  rawTiles: product [-8..14], [0..14]
  pxPerWidth: Ember.computed.alias "parentView.pxPerWidth"
  pxPerHeight: Ember.computed.alias "parentView.pxPerHeight"
  
  icon: Ember.computed "type", -> faicon @get "type"
  tiles: Ember.computed.map "rawTiles", ([x,y]) -> {x, y}
  gridModeEngaged: CPM.Macros.among "mode", "build", "move"

  actions:
    interact: ({x,y}, event) ->
      @sendAction "action", [x,y], event

`export default GridInteractions`