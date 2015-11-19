`import Ember from 'ember'`

alias = Ember.computed.alias
PlanIndexController = Ember.Controller.extend
  keys: alias "model.keys"
  icons: alias "model.icons"

`export default PlanIndexController`
