`import Ember from 'ember'`
`import JustTile from './just-tile'`

BlankTile = JustTile.extend
  width: Ember.computed.alias "parentView.pxPerWidth"
  height: Ember.computed.alias "parentView.pxPerHeight"
  cornerX: 0
  cornerY: 0
  strokeWidth: 0.75
  stroke: "#434343"
  fill: "#fff"
  hideText: true
  tileType: "blank"
  eventManager: Ember.Object.create
    mouseEnter: (event, view) ->
      view.set "hideText", false
    mouseLeave: (event, view) ->
      view.set "hideText", true
    click: (event, view) ->
      view.sendAction "action", view.get("model"), event
`export default BlankTile`