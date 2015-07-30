`import DS from 'ember-data'`

Camera = DS.Model.extend
  tileId: DS.attr "string"
  cameraStyle: DS.attr "string"
  permalink: DS.attr "string"
  cameraName: DS.attr "string"
  macAddress: DS.attr "string"
  createdAt: DS.attr "date"
  updatedAt: DS.attr "date"

  isImageCam: Ember.computed.equal "cameraStyle", "img-cgi"
  isWebCam: Ember.computed.equal "cameraStyle", "user-media"
  isKnown: Ember.computed.or "isImageCam", "isWebCam"
`export default Camera`