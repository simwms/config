`import Ember from 'ember'`

WebamWrapper = Ember.Component.extend
  options:
    width: 320
    height: 240
     
  didInsertElement: ->
    Webcam.set @get "options"
    Webcam.attach @$()[0]

  willDestroyElement: ->
    Webcam.reset()

`export default WebamWrapper`