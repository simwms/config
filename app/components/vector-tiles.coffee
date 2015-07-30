`import Ember from 'ember'`
`import CPM from 'ember-cpm'`

VectorTilesComponent = Ember.Component.extend
  tagName: "g"
  classNames: ["layer", "layer-tiles"]
  pxPerWidth: Ember.computed.alias "parentView.pxPerWidth"
  pxPerHeight: Ember.computed.alias "parentView.pxPerHeight"
  tiles: Ember.computed.alias "models"
  actions:
    interact: (tile, event) ->
      @sendAction "action", tile, event

`export default VectorTilesComponent`