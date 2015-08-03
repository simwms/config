`import Ember from 'ember'`
`import ENV from 'config/config/environment'`
IndexController = Ember.Controller.extend
  simwmsBackPath: ENV.simwmsHomePage
  simwmsHelpPath: ENV.simwmsHelpPage
  actions:
    submit: ->
      @get("model")
      .setup @store
      .then (session) =>
        if session.get("isLoggedIn")
          @transitionToRoute "tiles"


`export default IndexController`