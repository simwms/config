`import Ember from 'ember'`

EmployeeRoute = Ember.Route.extend
  model: ({id}) ->
    @store.find "employee", id

`export default EmployeeRoute`