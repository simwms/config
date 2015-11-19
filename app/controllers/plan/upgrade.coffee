`import Ember from 'ember'`

{Controller, computed} = Ember
{alias, or: firstPresent} = computed

PlanUpgradeController = Controller.extend
  plans: alias "model.plans"
  currentPlan: alias "model.currentPlan"
  chosenPlan: firstPresent "newPlan", "currentPlan"
  paymentSubscription: alias "model.subscription"
  actions:
    processStripeToken: (token) ->
      ps = @get "paymentSubscription"
      ps.set "source", token.id
      ps.set "servicePlan", @get("chosenPlan")
      @set "isBusy", true
      ps.save()
      .then =>
        presentation = @get("chosenPlan.presentation")
        @notify.success "It worked! Service plan switched to: #{presentation}"
        @transitionToRoute "plan.index"
      .catch (error) =>
        @notify.alert "Uh-oh! The server was unable to complete your request"
        console.log error
      .finally =>
        @set "isBusy", false
    cancelSubscription: ->

    selectPlan: (plan) ->
      @set "newPlan", plan

`export default PlanUpgradeController`
