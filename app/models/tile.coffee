`import Ember from 'ember'`
`import DS from 'ember-data'`

{computed} = Ember
{gt} = computed

Tile = DS.Model.extend
  type: "tile"
  tileType: DS.attr "string"
  tileName: DS.attr "string"
  status: DS.attr "string"
  x: DS.attr "number"
  y: DS.attr "number"
  z: DS.attr "number"
  a: DS.attr "number"
  width: DS.attr "number", defaultValue: 1
  height: DS.attr "number", defaultValue: 1
  cameras: DS.hasMany "camera"
  createdAt: DS.attr "date"
  updatedAt: DS.attr "date"

  hasCamera: gt "cameras.length", 0

  origin: computed "x", "y", "a",
    get: ->
      x: @get "x"
      y: @get "y"
      a: @get "a"

  iconText: computed "tileType",
    get: ->
      String.fromCharCode switch @get "tileType"
        when "barn" then 0xf239 # subway
        when "dock" then 0xf0d1 # truck
        when "road" then 0xf018 # road
        when "warehouse", "cell" then 0xf1b3 # cubes
        when "desk" then 0xf108 # desktop
        when "entrance" then 0xf090 # sign-in
        when "exit" then 0xf08b # sign-out
        when "scale" then 0xf24e # balance-scale
        else 0xf059 # question-circle

  
  
`export default Tile`