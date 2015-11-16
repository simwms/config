`import Ember from 'ember'`
`import DS from 'ember-data'`

{computed} = Ember
{alias} = computed

Line = DS.Model.extend
  x: DS.attr "number"
  y: DS.attr "number"
  a: DS.attr "number"
  points: DS.attr "points"
  lineName: DS.attr "string"
  lineType: DS.attr "string"
  insertedAt: DS.attr "moment"
  updatedAt: DS.attr "moment"

  type: alias "lineType"

  origin: computed "x", "y",
    get: ->
      x: @get "x"
      y: @get "y"

  thickness: computed "type",
    get: ->
      switch @get "type"
        when "road" then 0.3
        else 0

`export default Line`