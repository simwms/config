`import Ember from 'ember'`
`import PlanPresentation from '../utils/plan-presentation'`

PlanRoute = Ember.Route.extend
  beforeModel: ->
    unless @currentUser.get("accountLoggedIn")
      @transitionTo "index"
  model: ->
    @currentUser.get("meta").reload()
    .then (meta) ->
      meta.get("servicePlan")
      .then (plan) ->
        PlanPresentation.create {meta, plan}

`export default PlanRoute`
