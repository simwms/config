`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  @resource "tiles", path: "/tiles", ->
    @resource "tiles.camera", path: "/c/:cameraId", ->
      @route "view"
    @resource "tiles.tile", path: "/t/:tileId", ->
      @resource "tiles.tile.cameras", path: "/cameras", ->
        @route "new"

`export default Router`
