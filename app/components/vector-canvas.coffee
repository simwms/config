`import Ember from 'ember'`
`import CPM from 'ember-cpm'`
assertNumericality = (x) ->
  Ember.assert "Expected a number, instead got #{x}", x <= 0 or x > 0
  x

VectorCanvasComponent = Ember.Component.extend
  classNames: ['vector-canvas']
  attributeBindings: ["width", "height"]
  pxPerWidth: 55
  pxPerHeight: 55

  canvasTransform: CPM.Macros.fmt "translateX", "translateY", "translate(%@, %@)"
  init: ->
    @set "translateX", 0
    @set "translateY", 0
    @_super arguments...

  didInsertElement: ->
    @set "translateX", @canvasThirdWidth()
    @set "translateY", @canvasQuarterHeight()

    d3.select @$('svg')[0]
    .call @makeDragBehavior()

  canvasThirdWidth: ->
    assertNumericality @$().width() / 3
    
  canvasQuarterHeight: ->
    assertNumericality @$().height() / 4

  makeDragBehavior: ->
    d3.behavior.drag()
    .origin -> 
      x: 0
      y: 0
    .on "drag", =>
      {dx, dy} = d3.event
      @incrementProperty "translateX", dx / 2
      @incrementProperty "translateY", dy / 2

`export default VectorCanvasComponent`