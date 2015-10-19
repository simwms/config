`import Ember from 'ember'`

EmployeesRoute = Ember.Route.extend
  beforeModel: ->
    unless @currentUser.get("accountLoggedIn")
      @transitionTo "index"
  model: ->
    @store.find("employee")

  tearDown: Ember.on "deactivate", ->
    @controller.set "suspendedEmployee", null

`export default EmployeesRoute`