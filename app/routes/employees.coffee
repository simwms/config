`import Ember from 'ember'`

EmployeesRoute = Ember.Route.extend
  beforeModel: ->
    unless @currentUser.get("isLoggedIn")
      @transitionTo "index"
  model: ->
    @store.find "employee"

`export default EmployeesRoute`