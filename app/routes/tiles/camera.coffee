`import Ember from 'ember'`

TilesCameraRoute = Ember.Route.extend
  model: ({cameraId}) ->
    @store.find "camera", cameraId

`export default TilesCameraRoute`