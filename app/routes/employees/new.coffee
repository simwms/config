`import Ember from 'ember'`

NewRoute = Ember.Route.extend
  model: ->
    account = @currentUser.get("account")
    @store.createRecord "employee", account: account

  tearDown: Ember.on "deactivate", ->
    model = @controller.get "model"
    model.deleteRecord() if Ember.get(model, "isDirty")

`export default NewRoute`