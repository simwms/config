`import Ember from 'ember'`
`import validateAccountEmployee from 'config/validators/account-employee'`

NewRoute = Ember.Route.extend
  model: ->
    account = @currentUser.get("account")
    @store.createRecord "employee", {account}

  tearDown: Ember.on "deactivate", ->
    employee = @controller.get "employee"
    employee.deleteRecord() if Ember.get(employee, "isDirty")

`export default NewRoute`