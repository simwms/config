`import Ember from 'ember'`
`import {Atomic} from 'simwms-shared'`

C = Ember.Controller.extend Atomic,
  actions:
    fireEmployee: (employee) ->
      @set "suspendedEmployee", employee
    confirmFire: ->
      @atomically =>
        @get("suspendedEmployee")?.destroyRecord()
        .then => @set "suspendedEmployee", null
    closeModal: ->
      @set "suspendedEmployee", null


`export default C`