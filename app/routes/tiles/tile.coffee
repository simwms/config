`import Ember from 'ember'`

TilesTileRoute = Ember.Route.extend
  model: ({tileId}) ->
    @store.find "tile", tileId

`export default TilesTileRoute`