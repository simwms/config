`import Ember from 'ember'`

{Route, RSVP} = Ember

PlanUpgradeRoute = Route.extend
  model: ->
    RSVP.hash
      plans: @store.find "service-plan"
      currentPlan: RSVP.resolve @currentUser.get("servicePlan")
      subscription: @currentUser.get("paymentSubscription")

`export default PlanUpgradeRoute`
