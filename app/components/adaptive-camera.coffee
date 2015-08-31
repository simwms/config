`import Ember from 'ember'`

AdaptiveCameraComponent = Ember.Component.extend
  classNames: ["adaptive-camera"]
  acceptableTypes: ["img-cgi", "user-media"]

  isImageCam: Ember.computed.alias "camera.isImageCam"
  isWebCam: Ember.computed.alias "camera.isWebCam"
  isKnown: Ember.computed.alias "camera.isKnown"

`export default AdaptiveCameraComponent`