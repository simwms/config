`import Ember from 'ember'`

TilesTileRoute = Ember.Route.extend
  model: ({id}) ->
    @store.find "tile", id

`export default TilesTileRoute`