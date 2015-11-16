`import Ember from 'ember'`
`import ENV from 'config/config/environment'`
{computed} = Ember
{alias} = computed

IndexController = Ember.Controller.extend
  queryParams: ["userToken", "accountToken", "email", "password"]
  userToken: null
  accountToken: null
  
  simwmsBackPath: ENV.simwmsHomePage
  simwmsHelpPath: ENV.simwmsHelpPage

  actions:
    submit: ->
      email = @get("email")
      password = @get("password")
      userToken = @get("userToken")
      accountToken = @get "accountToken"
      @transitionToRoute "index",
        queryParams:
          {email, password, userToken, accountToken}

`export default IndexController`