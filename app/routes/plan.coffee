`import Ember from 'ember'`

computed = Ember.computed
alias = computed.alias
annotate = (valueKey, annotation) ->
  computed valueKey,
    get: ->
      primary: @get valueKey
      secondary: annotation

usage = (feature) ->
  computed "meta.#{feature}", "plan.#{feature}",
    get: ->
      primary: @get("meta.#{feature}")
      secondary: "out of #{@get "plan.#{feature}"} #{feature}"

PlanPresentation = Ember.Object.extend
  planName: alias "plan.simwmsName"
  cost: annotate "plan.pricePresentation", "monthly cost"
  docks: usage "docks"
  scales: usage "scales"
  warehouses: usage "warehouses"
  employees: usage "employees"
  availability: annotate "plan.availability", "hours available per day"
  appointments: annotate "plan.appointments", "appointments schedulable per day"
  keys: ["planName", "cost", "docks", "scales", "warehouses", "employees"]
  icons:
    planName: "fa fa-info-circle fa-lg"
    cost: "fa fa-money fa-lg"
    docks: "fa fa-subway fa-lg"
    scales: "fa fa-balance-scale fa-lg"
    warehouses: "fa fa-cubes fa-lg"
    employees: "fa fa-users fa-lg"
    availability: "fa fa-clock-o fa-lg"
    appointments: "fa fa-calendar fa-lg"
    

PlanRoute = Ember.Route.extend
  beforeModel: ->
    unless @currentUser.get("accountLoggedIn")
      @transitionTo "index"
  model: ->
    meta = @currentUser.get("meta")
    meta.get("servicePlan")
    .then (plan) ->
      PlanPresentation.create {meta, plan}

`export default PlanRoute`
