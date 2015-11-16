`import Ember from 'ember'`
`import DS from 'ember-data'`

{computed} = Ember

Point = DS.Model.extend
  x: DS.attr "number"
  y: DS.attr "number"
  a: DS.attr "number"
  pointName: DS.attr "string"
  pointType: DS.attr "string"
  insertedAt: DS.attr "moment"
  updatedAt: DS.attr "moment"

`export default Point`
