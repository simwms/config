`import Ember from 'ember'`
`import DS from 'ember-data'`

Tile = DS.Model.extend
  tileType: DS.attr "string"
  tileName: DS.attr "string"
  status: DS.attr "string"
  x: DS.attr "number"
  y: DS.attr "number"
  z: DS.attr "number"
  width: DS.attr "number", defaultValue: 1
  height: DS.attr "number", defaultValue: 1
  cameras: DS.hasMany "camera"
  createdAt: DS.attr "date"
  updatedAt: DS.attr "date"

  hasCamera: Ember.computed.gt "cameras.length", 0
  
`export default Tile`