`import Ember from 'ember'`
`import ENV from 'config/config/environment'`
{computed} = Ember
{alias} = computed

IndexController = Ember.Controller.extend
  queryParams: ["userToken", "accountToken"]
  userToken: null
  accountToken: null
  
  simwmsBackPath: ENV.simwmsHomePage
  simwmsHelpPath: ENV.simwmsHelpPage

  actions:
    submit: ->
      email = @get("email")
      password = @get("password")
      @currentUser.smartLogin({email, password})
      .then =>
        if @currentUser.get("isLoggedIn")
          alert "login success"
        else
          alert "login failed"

`export default IndexController`