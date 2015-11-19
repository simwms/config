`import Ember from 'ember'`
`import PlanPresentation from '../utils/plan-presentation'`
{RSVP, Route} = Ember
PlanRoute = Route.extend
  beforeModel: ->
    unless @currentUser.get("accountLoggedIn")
      @transitionTo "index"
  model: ->
    @currentUser.get("meta").reload()
    .then (meta) ->
      RSVP.hash
        sub: meta.get("paymentSubscription")
        plan: meta.get("servicePlan")
      .then ({sub, plan}) ->
        PlanPresentation.create {meta, plan, sub}

`export default PlanRoute`
